import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import UserList from './component/User/User'
import './App.css'
import PositionList from './component/PositionList'
import Header from './component/Header/Header';
import NewTeacher from './component/NewTeacher'
import NewTeacherPosition from './component/NewPosition';
function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<UserList />} />
        <Route
          path='/teacherPosition'
          element={<PositionList />} />
        <Route path="/teachers/create"
          element={<NewTeacher />} />
           <Route path="/position/create"
          element={<NewTeacherPosition/>} />
      </Routes>

    </>
  )
}

export default App
