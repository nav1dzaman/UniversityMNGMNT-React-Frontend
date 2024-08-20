import React, { useState } from 'react';
import { CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import StudentCourses from './StudentCourses';
import StudentAttendance from './StudentAttendance';
import StudentGrades from './StudentGrades';

export default function StudentTabs() {
  const [activeTab, setActiveTab] = useState(2);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  return (
    <div className="w-full bg-white shadow-md rounded-md ">
      <CTabs activeItemKey={activeTab} onActiveItemChange={handleTabChange}>
        <CTabList className="flex justify-center border-b bg-gray-100">
          <CTab
            aria-controls="home-tab-pane"
            itemKey={1}
            className={`py-2 px-4 cursor-pointer ${
              activeTab === 1
                ? 'border-b-2 border-blue-500 text-blue-500 '
                : 'text-gray-600'
            }`}
          >
            Courses
          </CTab>
          <CTab
            aria-controls="profile-tab-pane"
            itemKey={2}
            className={`py-2 px-4 cursor-pointer ${
              activeTab === 2
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-600'
            }`}
          >
          Attendance
          </CTab>
          <CTab
            aria-controls="contact-tab-pane"
            itemKey={3}
            className={`py-2 px-4 cursor-pointer ${
              activeTab === 3
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-600'
            }`}
          >
               Grade
          </CTab>
     
        </CTabList>
        <CTabContent>
          <CTabPanel className="py-3" aria-labelledby="home-tab-pane" itemKey={1}>
            <StudentCourses />
          </CTabPanel>
          <CTabPanel className="py-3" aria-labelledby="profile-tab-pane" itemKey={2}>
            <StudentAttendance />
          </CTabPanel>
          <CTabPanel className="py-3" aria-labelledby="contact-tab-pane" itemKey={3}>
            <StudentGrades />
          </CTabPanel>

        </CTabContent>
      </CTabs>
    </div>
  );
}
