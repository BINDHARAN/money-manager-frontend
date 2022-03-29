import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import application from '../images/application.PNG'
import edit from '../images/edit.PNG'
import add from '../images/add.PNG'
import charts from '../images/charts.PNG'
import mode from '../images/mode.PNG'


const home = [
    {
      title:"Money Manager Application",
      desc:"Money manager is an application where you can manage your financial things.Using this application the you can easily record your personal and business financial transactions, generate spending reports, review your daily, weekly and monthly financial data and manage your assets with Money Manager's spending tracker and budget planner.",
      img:application ,
    },
    {
        title:"Dashboard",
      desc: "In Dashboard you can get details of your monthly ,weekly and yearly details of income and expenditure alongside with the details of money spent on different categories like medical,food,fuel,movie,loan,etc and divisions like office and personal.",
      img: application,
    },
   
    {
        title:"Edit Option",
      desc: "In a dashboard page, Using edit button to you can easily edit your income and expense on your weekly data",
      img: edit,
    },
    {
        title:"Add New Income and Expense",
      desc: "In a Home page,Using add button to add your income and expenses.",
      img: add,
    },
    {
        title:"Charts",
      desc: "Here You can Trace your Total Income and Expense of your Personal and office revenue with the help of charts",
      img: charts,
    },
    {
        title:"Mode",
      desc: "This application having two modes , light and dark mode",
      img: mode,
    },
  ];

  
  const HomeDesc = () => {
      return (
        <div className="description">
        {home.map((data) => (
          <Desc data={data} />
        ))}
      </div>
      );
  }
  
  
  
 

function Desc({data}) {
  return (
    <Card  className='card'>
    <CardMedia
      component="img"
 
      className='img'
      image={data.img}
      alt="card-img"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div" >
        <p className='title'>     {data.title} </p>
      </Typography>

      <p className='card-content'>
          {data.desc}
      </p>

     
    </CardContent>
   
  </Card>
  )
}

export default HomeDesc