import { Suspense, createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { supabase } from './api/supabase';
import { Session } from '@supabase/supabase-js';

import MainPage from './components/UI/pages/MainPage';
import InfoPage from './components/UI/pages/InfoPage';
import LoginPage from './components/UI/pages/LoginPage';
import SearchPage from './components/UI/pages/SearchPage';
import AboutPage from './components/UI/pages/AboutPage';
import TestPage from './components/UI/pages/TestPage';
import { Category, Dict, Info, Item, TestType } from './types/types';
import Profile from './components/UI/pages/Profile';
import CategoriesPage from './components/UI/pages/CategoriesPage';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import SuccessRegister from './components/UI/pages/SuccessRegister';
import SuccessTest from './components/UI/pages/SuccessTest';
import TestResultPage from './components/UI/pages/TestResultPage';
import ItemPage from './components/UI/pages/ItemPage';
import ResetPasswordPage from './components/UI/pages/ResetPasswordPage';
import ChangePasswordPage from './components/UI/pages/ChangePasswordPage';

type AuthContextType = {
  session: Session | null,
  roles: string[],
  logout: () => void
}

type MetaDataType = {
  categories?: Category[] | undefined,
  regions?: Dict[] | undefined,
  districts?: Dict[] | undefined,
  lastItems?: Item[] | undefined,
  infoItems?: Info[] | undefined,
  testItems?: TestType[] | undefined,
}

export const AuthContext = createContext<AuthContextType>({ session: null, roles: [], logout: () => { } });
export const MetaDataContext = createContext<MetaDataType>({});

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>();
  const [regions, setRegions] = useState<Dict[]>();
  const [districts, setDistricts] = useState<Dict[]>();
  const [lastItems, setLastItems] = useState<Item[]>();
  const [infoItems, setInfoItems] = useState<Info[]>();
  const [testItems, setTestItems] = useState<TestType[]>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      getRole(session);
      getLastItems(session);
      getInfoItems(session);
      getTestItems(session);
    });
    getCategories();
    getRegions();
    getDistricts();
  }, []);

  const getRole = async (session: Session | null) => {
    const userId = session?.user.id;
    setRoles([]);
    if (userId) {
      const { data } = await supabase
        .from('user_role')
        .select('role')
        .eq('user_id', userId)
      if (data) {
        const prunedData = data.map((item) => {
          return item.role;
        });
        setRoles(prunedData);
      }
    }
  }

  const getCategories = async () => {
    const { data } = await supabase.from('category')
      .select(`
      id,
      title_kk,
      title_ru,
      title_en,
      photo,
      data->fields
    `)
      .order('order');
    if (data) {
      const prunedData = data.map((record) => {
        return {
          id: record.id,
          title_kk: record.title_kk,
          title_ru: record.title_ru,
          title_en: record.title_en,
          photo: record.photo,
          fields: record.fields
        } as Category
      });
      setCategories(prunedData);
    }
  };

  const getRegions = async () => {
    const { data } = await supabase.from('region').select();
    if (data) {
      const prunedData = data.map((record) => {
        return {
          id: record.id,
          title_kk: record.title_kk,
          title_ru: record.title_ru,
          title_en: record.title_en,
        } as Dict
      });
      setRegions(prunedData);
    }
  };

  const getDistricts = async () => {
    const { data } = await supabase.from('district').select();
    if (data) {
      const prunedData = data.map((record) => {
        return {
          id: record.id,
          title_kk: record.title_kk,
          title_ru: record.title_ru,
          title_en: record.title_en,
        } as Dict
      });
      setDistricts(prunedData);
    }
  }

  const getLastItems = async (session: Session | null) => {
    const { data } = await supabase
      .from('item')
      .select()
      .or(`is_active.eq.true${session?.user.id ? ', user_id.eq.' + session.user.id : ''}`)
      .limit(process.env.REACT_APP_LAST_ITEMS_COUNT ? parseInt(process.env.REACT_APP_LAST_ITEMS_COUNT) : 10)
    if (data) {
      setLastItems(data);
    }
  }

  const getInfoItems = async (session: Session | null) => {
    const { data } = await supabase
      .from('info')
      .select()
      .or(`is_active.eq.true${session?.user.id ? ', user_id.eq.' + session.user.id : ''}`)
      .order('order', { ascending: false })
    if (data) {
      setInfoItems(data);
    }
  }

  const getTestItems = async (session: Session | null) => {
    const { data } = await supabase
      .from('tests')
      .select()
      .or(`is_active.eq.true${session?.user.id ? ', user_id.eq.' + session.user.id : ''}`)
      .order('order', { ascending: false })
    if (data) {
      setTestItems(data);
    }
  }

  const handleLogout = () => {
    setSession(null);
    setRoles([]);
  }

  const authCtx = {
    session: session,
    roles: roles,
    logout: handleLogout
  }

  const metaCtx = {
    categories: categories,
    regions: regions,
    districts: districts,
    lastItems: lastItems,
    infoItems: infoItems,
    testItems: testItems,
  }

  return (
    <Suspense fallback="loading">
      <AuthContext.Provider value={authCtx}>
        <MetaDataContext.Provider value={metaCtx}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/items'>
                <Route path=':itemId' element={
                  <ItemPage isEdit={false} />
                } />
                <Route path='edit/:itemId' element={
                  <ItemPage isEdit={true} />
                } />
                <Route path='new' element={
                  <ItemPage isEdit={true} />
                } />
              </Route>
              <Route path='/info'>
                <Route path=':infoId' element={
                  <InfoPage isEdit={false} />
                } />
                <Route path='edit/:infoId' element={
                  <InfoPage isEdit={true} />
                } />
                <Route path='new' element={
                  <InfoPage isEdit={true} />
                } />
              </Route>
              <Route path='/tests'>
                <Route path=':testId' element={
                  <TestPage isEdit={false} />
                } />
                <Route path='edit/:testId' element={
                  <TestPage isEdit={true} />
                } />
                <Route path='new' element={
                  <TestPage isEdit={true} />
                } />
              </Route>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/categories' element={<CategoriesPage />} />
              <Route path='/register_success' element={<SuccessRegister />} />
              <Route path='/test_success' element={<SuccessTest />} />
              <Route path='/test_result/:testId' element={<TestResultPage />} />
              <Route path='/reset_password' element={<ResetPasswordPage />} />
              <Route path='/profile/change_password' element={<ChangePasswordPage />} />
            </Routes>
          </BrowserRouter>
        </MetaDataContext.Provider>
      </AuthContext.Provider>
    </Suspense>
  );
}

export default App;
