/** @jsxRuntime classic */
/** @jsx jsx */

import dayjs from 'dayjs'
import { Fragment, useEffect, useMemo } from 'react'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Column, useTable } from 'react-table'
import { Box, Button, Container, Flex, jsx } from 'theme-ui'

import { selectAuthInfo } from '../redux/authSlice'
import { singleEvent } from '../redux/eventSlice'
import { fetchEvents, modifyEvent } from '../redux/eventsSlice'
import { RemoveFromConference } from '../redux/conferenceSlice'
import {
  AddRemoveEvent,
  Conference,
  ConferenceUpdateData,
  Event,
  EventUpdateData,
  Filter,
  ModalTypes,
  UpdateConference,
} from '../redux/types'
import ShowModal from './common/CustomModal'
import ManageNavBar from './common/ManageNavBar'

interface conferenceEventManageProps {
  eventList: Event[]
  conference: Conference
}

function ManageEventsConference({
  eventList,
  conference,
}: conferenceEventManageProps): JSX.Element {
  const dispatch = useDispatch()
  const history = useHistory()
  const auth = useSelector(selectAuthInfo)

  const Columns: Array<Column<Event>> = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Tags',
      accessor: 'tags',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Start Date',
      accessor: row => dayjs(row.startDate).format('YYYY-MM-DD'),
    },
    {
      Header: 'End Date',
      accessor: row => dayjs(row.endDate).format('YYYY-MM-DD'),
    },
    {
      Header: 'Speaker',
      accessor: 'speaker',
    },
    {
      Header: 'Actions',
      Cell: btn,
    },
  ]

  useEffect(() => {
    return () => {
      const newFilter: Filter = {
        createdBy: auth.userInfo.userId,
        conferenceId: conference.id,
      }
      dispatch(fetchEvents(newFilter))
    }
  }, [conference.eventsId])

  const handleDelete = async (id: string) => {
    const conferenceToUpdate: AddRemoveEvent = {
      conferenceId: conference.id,
      content: {
        actionType: 'Remove',
        eventsArray: [id],
      },
      token: auth.userInfo.token,
    }
    dispatch(RemoveFromConference(conferenceToUpdate))
    const newFilter: Filter = {
      createdBy: auth.userInfo.userId,
      conferenceId: conference.id,
    }
    dispatch(fetchEvents(newFilter))
    ShowModal({
      onSuccess: () => {
        history.push('/conferences/ConferenceEventsManager/' + conference.id)
      },
      type: ModalTypes.DeleteSucceededModalValues,
    })
  }

  function btn(e: any) {
    return (
      <Fragment>
        <Flex>
          <Button
            onClick={() => history.push(`/events/update/${e.row.original.id}`)}
            sx={{
              alignItems: 'center',
              display: 'flex',
              height: '40px',
              justifyContent: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '50px',
            }}
            type="button"
            variant="green"
          >
            <FiEdit />
          </Button>
          <Button
            onClick={() =>
              ShowModal({
                type: ModalTypes.ConfirmDeleteModalValues,
                onSuccess: () => handleDelete(e.row.original.id),
              })
            }
            sx={{
              alignItems: 'center',
              display: 'flex',
              height: '40px',
              justifyContent: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '50px',
            }}
            type="button"
            variant="red"
          >
            <RiDeleteBin5Line />
          </Button>
        </Flex>
      </Fragment>
    )
  }

  const columns = useMemo(() => Columns, [])
  const data = useMemo(() => eventList, [])
  const tableInstance = useTable({
    columns,
    data,
  })
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance
  return (
    <Fragment>
      <ManageNavBar conferenceId={conference.id} sx={{ marginTop: '-65px' }} />
      <Box sx={{ marginTop: 50 }}>
        <table
          sx={{
            backgroundColor: 'white',
            borderSpacing: 1,
            borderCollapse: 'collapse',
            borderRadius: '6px',
            maxWidth: '90vw',
            margin: '0 auto',
            overflow: 'hidden',
            position: 'relative',
            'tr:nth-of-type(even)': {
              backgroundColor: '#f2f2f2',
            },
          }}
          {...getTableProps()}
        >
          <thead
            sx={{
              backgroundColor: '#fff',
              borderBottom: '2px solid grey',
              borderTop: '2px solid grey',
              fontSize: '16px',
              height: '60px',
            }}
          >
            {headerGroups.map((headerGroup, index) => (
              <tr
                sx={{ height: '60px' }}
                {...headerGroup.getHeaderGroupProps()}
                key={index}
              >
                {headerGroup.headers.map((column, columnIndex) => (
                  <th
                    sx={{ paddingLeft: '8px' }}
                    {...column.getHeaderProps()}
                    key={columnIndex}
                  >
                    {' '}
                    {column.render('Header')}{' '}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row)
              return (
                <tr
                  sx={{ height: '48px' }}
                  {...row.getRowProps()}
                  key={rowIndex}
                >
                  {row.cells.map((cell, cellIndex) => {
                    return (
                      <td
                        sx={{
                          borderBottom: '3px solid #f2f2f2',
                          left: '10px',
                          textAlign: 'center',
                          top: '0',
                          width: '450px',
                        }}
                        {...cell.getCellProps()}
                        key={cellIndex}
                      >
                        {' '}
                        {cell.render('Cell')}{' '}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </Box>
    </Fragment>
  )
}

export default ManageEventsConference
