import { Route, Routes } from 'react-router';
import HomePage, { BusinessPage, NotFound } from '../pages';
export default function App() { return <Routes><Route path="/" element={<HomePage />} /><Route path="/b/:slug" element={<BusinessPage />} /><Route path="*" element={<NotFound />} /></Routes>; }
