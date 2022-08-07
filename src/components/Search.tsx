/** @jsxRuntime classic */
/** @jsx jsx */

import { Field, Form, Formik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { HiSearch, HiSortAscending, HiSortDescending } from 'react-icons/hi'
import { IoOptionsOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { Box, Container, Flex, jsx, Label } from 'theme-ui'

import { selectAuthInfo } from '../redux/authSlice'
import { fetchEvents } from '../redux/eventsSlice'
import { EventStatus, Filter } from '../redux/types'
import RadioItem from './common/RadioItem'
import ToggleSwitch from './common/ToggleSwitch'
import ResponsiveContainer from './custom-components/ResponsiveContainer'

const backgroundColor = '#EEEEEE'

const customFilter = {
  display: 'block',
  mx: '4px',
  marginTop: '0',
  px: '16px',
  py: '8px',
  width: '200px',
}

const customLabel = {
  marginBottom: '0',
  px: '0',
  py: '0',
  span: {
    fontSize: '.7em',
  },
}

const floatingMenuActive = {
  alignContent: 'stretch',
  backgroundColor: `${backgroundColor}`,
  borderRadius: '3px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
  marginTop: '5px',
  position: 'absolute',
  zIndex: 1,
}

const floatingMenuInactive = {
  display: 'none',
}

const responsiveBarItem = {
  '@media only screen and (max-width: 768px)': {
    display: 'none',
  },
}

const responsiveMenuItem = {
  display: 'none',
  '@media only screen and (max-width: 768px)': {
    display: 'inline-flex',
  },
}

interface OrderByComponentProps {
  isAscending: boolean
  onClick: () => void
}

export const OrderByComponent = ({
  isAscending,
  onClick,
}: OrderByComponentProps): JSX.Element => (
  <Box sx={{ display: 'inline-flex' }}>
    <Field
      as="select"
      data-tip="Sort by"
      id="orderBy"
      name="orderBy"
      sx={{ variant: 'search.item' }}
    >
      <option value="name">Name</option>
      <option value="startDate">Start Date</option>
    </Field>
    <button
      data-tip="Change order"
      onClick={onClick}
      sx={{ variant: 'search.item' }}
      type="button"
    >
      {isAscending ? <HiSortAscending /> : <HiSortDescending />}
    </button>
  </Box>
)

interface FloatingMenuProps {
  handleChangeOrderType: () => void
  handleJoinedEventsToggle: () => void
  isAscending: boolean
  onlyJoinedEvents: boolean
  userId: number | undefined
}

export const FloatingMenu = ({
  handleChangeOrderType,
  handleJoinedEventsToggle,
  isAscending,
  onlyJoinedEvents,
  userId,
}: FloatingMenuProps): JSX.Element => (
  <Flex sx={{ flexDirection: 'column' }}>
    <Label sx={responsiveMenuItem}>Order by</Label>
    <Box sx={{ ...responsiveMenuItem, paddingLeft: '20px' }}>
      <OrderByComponent
        isAscending={isAscending}
        onClick={handleChangeOrderType}
      />
    </Box>
    {userId ? (
      <Container
        sx={{
          ...customFilter,
          ...customLabel,
          marginBottom: '8px',
        }}
      >
        <Label sx={{ color: 'black' }}>Joined Events</Label>
        <ToggleSwitch
          isToggled={onlyJoinedEvents}
          onToggle={handleJoinedEventsToggle}
        />
      </Container>
    ) : null}
    <Label htmlFor="status" sx={{ ...customFilter, ...customLabel }}>
      Status
    </Label>
    <Container
      sx={{
        marginTop: '0px',
        padding: '0px',
      }}
    >
      <RadioItem
        color="green"
        defaultChecked={true}
        label={EventStatus.PUBLISHED}
        name="status"
        value={EventStatus.PUBLISHED}
      />
      <RadioItem
        color="red"
        label={EventStatus.FINISHED}
        name="status"
        value={EventStatus.FINISHED}
      />
    </Container>
    <label htmlFor="tags" sx={{ ...customFilter, ...customLabel }}>
      Tags
    </label>
    <Field
      id="tags"
      name="tags"
      sx={{ variant: 'search.item', ...customFilter }}
      type="text"
    />
    <label htmlFor="startDate" sx={{ ...customFilter, ...customLabel }}>
      Start Date <span>(Event)</span>
    </label>
    <Field
      id="startDate"
      name="startDate"
      sx={{ variant: 'search.item', ...customFilter }}
      type="date"
    />
    <label htmlFor="endDate" sx={{ ...customFilter, ...customLabel }}>
      End Date <span>(Event)</span>
    </label>
    <Field
      id="endDate"
      name="endDate"
      sx={{ variant: 'search.item', ...customFilter }}
      type="date"
    />
  </Flex>
)

function Search(): JSX.Element {
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState(false)
  const [isAscending, setIsAscending] = useState(true)
  const [onlyJoinedEvents, setOnlyJoinedEvents] = useState(false)
  const auth = useSelector(selectAuthInfo)
  const userId = auth.userInfo.userId
  const filterDropdownDiv = useRef<HTMLInputElement>(null)

  const closeFilterDropdown = (event: MouseEvent) => {
    const filterDropdown = filterDropdownDiv.current
    if (filterDropdown) {
      if (!filterDropdown.contains(event.target as HTMLInputElement))
        setIsActive(false)
    }
  }

  useEffect(() => {
    if (isActive) {
      window.addEventListener('click', closeFilterDropdown)
      return () => {
        window.removeEventListener('click', closeFilterDropdown)
      }
    }
  }, [isActive])

  const currentFilterOptionsStyle = isActive
    ? floatingMenuActive
    : floatingMenuInactive

  const initialState: Filter = {
    endDate: '',
    name: '',
    orderBy: '',
    startDate: '',
    status: 'published',
    tags: '',
    skip: 0,
    top: 10,
  }

  const handleSubmit = async (values: Filter, { setSubmitting }: any) => {
    const currentOrderField = values.orderBy ? values.orderBy : 'name'
    const currentOrderType = isAscending ? 'asc' : 'desc'
    await localStorage.removeItem('myFilter')
    const filter = {
      ...values,
      status: values.status,
      orderBy: `${currentOrderField} ${currentOrderType}`,
      joinedByUser: onlyJoinedEvents ? userId : null,
    }
    await dispatch(fetchEvents(filter))
    setSubmitting(false)

    await localStorage.setItem(
      'myFilter',
      JSON.stringify({ ...filter, skip: 1 }),
    )
  }

  return (
    <ResponsiveContainer backgroundColor={backgroundColor}>
      <Formik initialValues={initialState} onSubmit={handleSubmit}>
        <Form sx={{ variant: 'search.bar' }}>
          <div>
            <button
              onClick={() => setIsActive(!isActive)}
              sx={{ variant: 'search.item' }}
              type="button"
            >
              <IoOptionsOutline />
              <span data-tip="Filter Events" sx={responsiveBarItem}>
                Filter
              </span>
            </button>
            <div ref={filterDropdownDiv} sx={currentFilterOptionsStyle}>
              <FloatingMenu
                handleChangeOrderType={() => setIsAscending(!isAscending)}
                handleJoinedEventsToggle={() =>
                  setOnlyJoinedEvents(!onlyJoinedEvents)
                }
                isAscending={isAscending}
                onlyJoinedEvents={onlyJoinedEvents}
                userId={userId}
              />
            </div>
          </div>
          <div
            sx={{
              display: 'inline-flex',
              width: '100%',
            }}
          >
            <Field
              id="name"
              name="name"
              placeholder="Search by name"
              sx={{
                boxSizing: 'border-box',
                variant: 'search.item',
                width: '100%',
              }}
              type="text"
            />
          </div>
          <div sx={responsiveBarItem}>
            <OrderByComponent
              isAscending={isAscending}
              onClick={() => setIsAscending(!isAscending)}
            />
          </div>
          <div>
            <button sx={{ variant: 'search.item' }} type="submit">
              <HiSearch />
              <span sx={responsiveBarItem}>Search</span>
            </button>
          </div>
        </Form>
      </Formik>
      <ReactTooltip
        textColor="white"
        backgroundColor="rgba(71,64,68,0.8)"
        place="bottom"
      />
    </ResponsiveContainer>
  )
}

export default Search
