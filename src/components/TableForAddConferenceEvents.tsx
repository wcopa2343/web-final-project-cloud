/** @jsxRuntime classic */
/** @jsx jsx */

import dayjs from 'dayjs'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { FiPlusSquare } from 'react-icons/fi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { Column, useTable } from 'react-table'
import { Button, Container, Flex, jsx } from 'theme-ui'

import { Event } from '../redux/types'

interface eventsProps {
  eventList: Event[]
  handleClickContinue: (events: string[]) => void
}

export function TableForAddConferenceEvents({
  eventList,
  handleClickContinue,
}: eventsProps): JSX.Element {
  const [eventsToAdd, setEvents] = useState<string[]>([])
  const Columns: Array<Column<Event>> = [
    {
      Header: 'Name',
      accessor: 'name',
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
      Header: 'Tags',
      accessor: 'tags',
    },
    {
      Header: 'Category',
      accessor: 'category',
    },
    {
      Header: 'Actions',
      Cell: AddOrRemovebutton,
    },
  ]
  let helper: string[]
  function AddOrRemovebutton(e: any) {
    const [isAdded, setIsAdded] = useState(false)
    return (
      <Fragment>
        <Flex>
          <Button
            onClick={() => {
              helper = eventsToAdd
              helper.push(e.row.original.id)
              setEvents(helper)
              setIsAdded(true)
            }}
            sx={{
              alignItems: 'center',
              display: isAdded ? 'none' : 'flex',
              height: '40px',
              justifyContent: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '50px',
            }}
            type="button"
            variant="green"
          >
            <FiPlusSquare />
          </Button>
          <Button
            onClick={() => {
              helper = eventsToAdd
              helper.splice(eventsToAdd.indexOf(e.row.original.id), 1)
              setEvents(helper)
              setIsAdded(false)
            }}
            sx={{
              alignItems: 'center',
              display: isAdded ? 'flex' : 'none',
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
    prepareRow,
    rows,
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
                {headerGroup.headers.map((column, headerIndex) => (
                  <th
                    sx={{ paddingLeft: '8px' }}
                    {...column.getHeaderProps()}
                    key={headerIndex}
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
      <Flex
        sx={{
          alignContent: 'center',
          justifyContent: 'flex-end',
          marginTop: '20px',
          mx: 'auto',
          width: '90vw',
        }}
      >
        <Button
          onClick={() => {
            handleClickContinue(eventsToAdd)
          }}
          sx={{
            fontSize: '23px',
            '&:hover': { fontSize: '24px' },
          }}
          variant="green"
        >
          Continue
        </Button>
      </Flex>
    </Fragment>
  )
}
