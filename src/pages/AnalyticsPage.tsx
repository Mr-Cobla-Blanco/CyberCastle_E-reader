import React, { useState } from 'react';
import { Calendar, Filter, FilePlus, Download } from 'lucide-react';
import Navbar from '../components/Navigation/Navbar';
import ReadingStats from '../components/Analytics/ReadingStats';
import ReadingChart from '../components/Analytics/ReadingChart';
import ReadingGoal from '../components/Analytics/ReadingGoal';
import ReadingStreak from '../components/Analytics/ReadingStreak';
import { mockReadingSessions, mockGoals } from '../data/mockBooks';
import { format, subDays, parseISO } from 'date-fns';

const AnalyticsPage: React.FC = () => {
  const [periodFilter, setPeriodFilter] = useState<'day' | 'week' | 'month'>('week');
  const [chartDataType, setChartDataType] = useState<'minutes' | 'pages' | 'words'>('minutes');
  
  // Calculate analytics data
  const today = new Date();
  const sessions = mockReadingSessions;
  
  // For daily stats
  const todaySessions = sessions.filter(
    session => session.date === format(today, 'yyyy-MM-dd')
  );
  
  const dailyStats = {
    minutesRead: todaySessions.reduce((sum, session) => sum + (session.duration / 60), 0),
    pagesRead: todaySessions.reduce((sum, session) => sum + session.pagesRead, 0),
    wordsRead: todaySessions.reduce((sum, session) => sum + session.wordsRead, 0),
    averageWpm: todaySessions.length 
      ? todaySessions.reduce((sum, session) => sum + session.wpm, 0) / todaySessions.length 
      : 0,
  };
  
  // For weekly chart data
  const generateWeeklyData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(today, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const daySessions = sessions.filter(session => session.date === dateStr);
      
      data.push({
        day: format(date, 'EEE'),
        minutesRead: daySessions.reduce((sum, session) => sum + (session.duration / 60), 0),
        pagesRead: daySessions.reduce((sum, session) => sum + session.pagesRead, 0),
        wordsRead: daySessions.reduce((sum, session) => sum + session.wordsRead, 0),
      });
    }
    return data;
  };
  
  // For weekly stats
  const weeklyStats = {
    minutesRead: sessions.reduce((sum, session) => sum + (session.duration / 60), 0),
    pagesRead: sessions.reduce((sum, session) => sum + session.pagesRead, 0),
    wordsRead: sessions.reduce((sum, session) => sum + session.wordsRead, 0),
    averageWpm: sessions.length 
      ? sessions.reduce((sum, session) => sum + session.wpm, 0) / sessions.length 
      : 0,
  };
  
  // For reading streak
  const pastWeekDates = Array(7).fill(null).map((_, i) => 
    format(subDays(today, i), 'yyyy-MM-dd')
  );
  
  const streakDays = [...new Set(sessions.map(session => session.date))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 md:pb-0 md:pt-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reading Analytics</h1>
          
          <div className="flex gap-2">
            <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setPeriodFilter('day')}
                className={`px-3 py-2 text-sm ${
                  periodFilter === 'day'
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setPeriodFilter('week')}
                className={`px-3 py-2 text-sm ${
                  periodFilter === 'week'
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setPeriodFilter('month')}
                className={`px-3 py-2 text-sm ${
                  periodFilter === 'month'
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Month
              </button>
            </div>
            
            <button className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
              <Calendar className="h-5 w-5" />
            </button>
            
            <button className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <ReadingStats
              minutesRead={periodFilter === 'day' ? dailyStats.minutesRead : weeklyStats.minutesRead}
              pagesRead={periodFilter === 'day' ? dailyStats.pagesRead : weeklyStats.pagesRead}
              wordsRead={periodFilter === 'day' ? dailyStats.wordsRead : weeklyStats.wordsRead}
              averageWpm={periodFilter === 'day' ? dailyStats.averageWpm : weeklyStats.averageWpm}
              period={periodFilter === 'day' ? 'Today\'s' : periodFilter === 'week' ? 'This Week\'s' : 'This Month\'s'}
            />
          </div>
          
          <div>
            <ReadingStreak
              currentStreak={3}
              longestStreak={5}
              streakDays={streakDays}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <ReadingChart
              data={generateWeeklyData()}
              period="week"
              dataType={chartDataType}
            />
          </div>
          
          <div className="space-y-6">
            {mockGoals.map((goal) => (
              <ReadingGoal
                key={goal.id}
                type={goal.type as any}
                target={goal.target}
                progress={goal.progress}
                unit={goal.unit as any}
              />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Most Active Reading Times
              </h3>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Based on past 30 days
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {Array.from({ length: 7 }).map((_, dayIndex) => (
                <div key={dayIndex} className="text-center text-xs text-gray-500 dark:text-gray-400">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'][dayIndex]}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 24 * 7 }).map((_, index) => {
                const intensity = Math.random();
                let bgColor = 'bg-gray-100 dark:bg-gray-700';
                
                if (intensity > 0.9) {
                  bgColor = 'bg-primary-500 dark:bg-primary-400';
                } else if (intensity > 0.7) {
                  bgColor = 'bg-primary-400 dark:bg-primary-500';
                } else if (intensity > 0.5) {
                  bgColor = 'bg-primary-300 dark:bg-primary-600';
                } else if (intensity > 0.3) {
                  bgColor = 'bg-primary-200 dark:bg-primary-700';
                } else if (intensity > 0.1) {
                  bgColor = 'bg-primary-100 dark:bg-primary-800';
                }
                
                return (
                  <div 
                    key={index} 
                    className={`h-3 ${bgColor} rounded-sm`}
                    title={`${Math.round(intensity * 100)}% activity`}
                  />
                );
              })}
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-1">
                <span className="block w-3 h-3 bg-gray-100 dark:bg-gray-700 rounded-sm"></span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Less</span>
              </div>
              
              <div className="flex items-center gap-1">
                <span className="block w-3 h-3 bg-primary-500 dark:bg-primary-400 rounded-sm"></span>
                <span className="text-xs text-gray-500 dark:text-gray-400">More</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Export Reading Data
              </h3>
            </div>
            
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750">
                <div className="flex items-center">
                  <FilePlus className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Reading Sessions</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Export all reading activity</div>
                  </div>
                </div>
                <Download className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750">
                <div className="flex items-center">
                  <FilePlus className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Highlights & Notes</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Export all annotations</div>
                  </div>
                </div>
                <Download className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750">
                <div className="flex items-center">
                  <FilePlus className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Library Data</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Export book collection details</div>
                  </div>
                </div>
                <Download className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;