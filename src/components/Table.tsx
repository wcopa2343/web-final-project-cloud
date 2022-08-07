/** @jsxRuntime classic */
/** @jsx jsx */

import dayjs from 'dayjs'
import { Fragment, useMemo } from 'react'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Column, useTable } from 'react-table'
import { Button, Container, Flex, jsx } from 'theme-ui'

import { selectAuthInfo } from '../redux/authSlice'
import { removeEvent } from '../redux/eventsSlice'
import { Event, EventDeleteData, ModalTypes } from '../redux/types'
import ShowModal from './common/CustomModal'
interface eventsProps {
  eventList: Event[]
}

export function Table({ eventList }: eventsProps): JSX.Element {
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
  const handleDelete = (id: string) => {
    const eventToDelete: EventDeleteData = {
      eventId: id,
      token: auth.userInfo.token,
    }
    dispatch(removeEvent(eventToDelete))
    ShowModal({
      onSuccess: () => {
        history.push('/events/eventsManager')
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

  const dispatch = useDispatch()
  const history = useHistory()
  const auth = useSelector(selectAuthInfo)

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
      <Container variant="noMargin" sx={{ marginTop: 50 }}>
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
            {headerGroups.map((headerGroup, headerGroupIndex) => (
              <tr
                sx={{ height: '60px' }}
                {...headerGroup.getHeaderGroupProps()}
                key={headerGroupIndex}
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
      </Container>
    </Fragment>
  )
}
