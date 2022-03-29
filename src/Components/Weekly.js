import React, { useEffect } from 'react'
import { Dashboard } from './Dashboard'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Container,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  
  TableRow,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Box } from '@mui/system'
import EditIcon from '@mui/icons-material/Edit'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { useHistory } from 'react-router-dom'

export function Weekly({ color }) {
  const [data, setData] = useState([])
  useEffect(() => {
    const loadData = async () => {
      var response = await axios.get(
        'https://bindharan.herokuapp.com/transactions',
      )
      setData(response.data)
    }
    loadData()
  }, [])

  const history = useHistory()


 
  //sort by income
  const [incomeSort, setIncomeSort] = useState(true)
  const handleSortByIncome = () => {
    setIncomeSort(!incomeSort)
  }
  const [expenseSort, setExpenseSort] = useState(true)
  const handleExpenseByIncome = () => {
    setExpenseSort(!expenseSort)
  }
  //sort by type
  const [type, setType] = useState('office')
  const handleType = (e) => {
    setType(e.target.value)
  }
  return (
    <>
      <Dashboard color={color} />
      <Container>
        <Typography
          sx={{
            fontWeight: '600',
            fontSize: '22px',
            textAlign: 'center',
            mb: 3,
          }}
        >
          Weekly
        </Typography>
        {/* <Button sx={{float:'right'}}>Sort by</Button> */}
        <Box sx={{ textAlign: 'center' }}>
          <Box>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  sx={{ mx: 3, mb: 1 }}
                  value="office"
                  name="type"
                  control={<Radio />}
                  label="Office"
                  onChange={handleType}
                />
                <FormControlLabel
                  sx={{ mb: 1 }}
                  value="personal"
                  name="type"
                  control={<Radio />}
                  label="Personal"
                  onChange={handleType}
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: '600', textAlign: 'center' }}>
                    S.No
                  </TableCell>
                  <TableCell
                    onClick={handleSortByIncome}
                    sx={{
                      cursor: 'pointer',
                      fontWeight: '600',
                      textAlign: 'center',
                    }}
                  >
                    {incomeSort ? <>Income&#8595;</> : <>Income&#8593;</>}
                  </TableCell>
                  <TableCell
                    onClick={handleExpenseByIncome}
                    sx={{
                      cursor: 'pointer',
                      fontWeight: '600',
                      textAlign: 'center',
                    }}
                  >
                    {expenseSort ? <>Expense&#8595;</> : <>Expense&#8593;</>}
                  </TableCell>
                  <TableCell sx={{ fontWeight: '600', textAlign: 'center' }}>
                    Description
                  </TableCell>
                  <TableCell sx={{ fontWeight: '600', textAlign: 'center' }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: '600', textAlign: 'center' }}>
                    Time
                  </TableCell>
                  <TableCell sx={{ fontWeight: '600', textAlign: 'center' }}>
                    Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: '600', textAlign: 'center' }}>
                    Edit
                  </TableCell>
                  <TableCell sx={{ fontWeight: '600', textAlign: 'center' }}>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incomeSort && expenseSort && type === 'office' ? (
                  data

                    .sort((a, b) =>
                      parseInt(a.income) > parseInt(b.income) ? 1 : -1,
                    )
                    .sort((a, b) =>
                      parseInt(a.expense) > parseInt(b.expense) ? 1 : -1,
                    )
                   .filter((i) => i.type === 'office')
                    .map((row, i) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row._id}
                        >
                          <TableCell sx={{ textAlign: 'center' }}>
                            {i + 1}
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            {row.income}
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            {row.expense}
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            {row.desc.charAt(0).toUpperCase() +
                              row.desc.slice(1)}
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            {row.date.split(' ').slice(1).join(' ')}
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <>
                              {
                                new Date(row.time)
                                  .toLocaleString('en-US', {
                                    timeZone: 'Asia/Kolkata',
                                  })
                                  .split(',')[1]
                              }
                            </>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            {row.type.charAt(0).toUpperCase() +
                              row.type.slice(1)}
                          </TableCell>

                          <TableCell sx={{ textAlign: 'center' }}>
                            {
                              <Tooltip title="Edit">
                                <IconButton
                                  aria-label="edit button"
                                  onClick={() =>
                                    history.push(`/transactions/${row._id}`)
                                  }
                                  color="secondary"
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                            }
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            {
                              <Tooltip title="Delete">
                                <IconButton
                                  aria-label="delete"
                                  style={{ marginLeft: 'auto' }}
                                  onClick={() => {
                                    fetch(
                                      `https://bindharan.herokuapp.com/transactions/${row._id}`,
                                      {
                                        method: 'DELETE',
                                      },
                                    ).then(() => history.push('/dashboard'))
                                  }}
                                  color="error"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            }
                          </TableCell>
                        </TableRow>
                      )
                    })
                ) : (
                  <>
                    {data

                      .sort((a, b) =>
                        parseInt(a.income) < parseInt(b.income) ? 1 : -1,
                      )
                      .sort((a, b) =>
                        parseInt(a.expense) < parseInt(b.expense) ? 1 : -1,
                      )
                      .filter((i) => i.type === 'personal')
                      .map((row, i) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row._id}
                          >
                            <TableCell sx={{ textAlign: 'center' }}>
                              {i + 1}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {row.income}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {row.expense}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {row.desc.charAt(0).toUpperCase() +
                                row.desc.slice(1)}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {row.date.split(' ').slice(1).join(' ')}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              <>
                                {
                                  new Date(row.time)
                                    .toLocaleString('en-US', {
                                      timeZone: 'Asia/Kolkata',
                                    })
                                    .split(',')[1]
                                }
                              </>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {row.type.charAt(0).toUpperCase() +
                                row.type.slice(1)}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {
                                <Tooltip title="Edit">
                                  <IconButton
                                    aria-label="edit button"
                                    onClick={() =>
                                      history.push(`/transactions/${row._id}`)
                                    }
                                    color="secondary"
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                              }
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {
                                <Tooltip title="Delete">
                                  <IconButton
                                    aria-label="delete"
                                    style={{ marginLeft: 'auto' }}
                                    onClick={() => {
                                      fetch(
                                        `https://bindharan.herokuapp.com/transactions/${row._id}`,
                                        {
                                          method: 'DELETE',
                                        },
                                      ).then(() => history.push('/dashboard'))
                                    }}
                                    color="error"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              }
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
         
        </Paper>
      </Container>
    </>
  )
}
