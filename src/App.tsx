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
import ItemView from './components/UI/views/ItemView';
import ItemForm from './components/UI/forms/ItemForm';
import ProtectedRouter from './components/UI/hoc/ProtectedRouter';

type AuthContextType = {
  session: Session | null,
  role: string,
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

export const AuthContext = createContext<AuthContextType>({ session: null, role: '', logout: () => { } });
export const MetaDataContext = createContext<MetaDataType>({});

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState('');
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
    });
    // supabase.auth.onAuthStateChange((_event, session) => {
    //   setSession(session);
    //   getRole(session);
    // });
    getCategories();
    getRegions();
    getDistricts();
    getLastItems();
    getInfoItems();
    getTestItems();
  }, []);

  const getRole = async (session: Session | null) => {
    const userId = session?.user.id;
    setRole('');
    if (userId) {
      const { data } = await supabase
        .from('user_role')
        .select()
        .eq('user_id', userId)
        .single();
      if (data) {
        setRole(data.role);
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

  const getLastItems = async () => {
    const { data } = await supabase
      .from('item')
      .select()
      .limit(process.env.REACT_APP_LAST_ITEMS_COUNT ? parseInt(process.env.REACT_APP_LAST_ITEMS_COUNT) : 10)
    if (data) {
      setLastItems(data);
    }
  }

  const getInfoItems = async () => {
    const { data } = await supabase
      .from('info')
      .select()
      .order('order', { ascending: false })
    if (data) {
      setInfoItems(data);
    }
  }

  const getTestItems = async () => {
    const { data } = await supabase
      .from('tests')
      .select()
      .order('order', { ascending: false })
    if (data) {
      setTestItems(data);
    }
  }

  const handleLogout = () => {
    setSession(null);
    setRole('');
  }

  const authCtx = {
    session: session,
    role: role,
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
                  <ItemView />
                } />
                <Route path='edit/:itemId' element={
                  <ProtectedRouter>
                    <ItemForm />
                  </ProtectedRouter>
                } />
                <Route path='new' element={
                  <ProtectedRouter>
                    <ItemForm />
                  </ProtectedRouter>
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
            </Routes>
          </BrowserRouter>
        </MetaDataContext.Provider>
      </AuthContext.Provider>
    </Suspense>
  );
}

export default App;
