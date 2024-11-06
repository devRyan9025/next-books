// CSS module
import SearchableLayouyt from '@/components/searchable-layout';
import style from './index.module.css';
import { ReactNode } from 'react';

export default function Home() {
  return (
    <>
      <h1 className={style.h1}>index</h1>
      <h2 className={style.h2}>H2</h2>
    </>
  );
}

// javascript에서 함수들은 사실상 객체로 인식되기 때문에, 메서드를 사용 가능
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayouyt>{page}</SearchableLayouyt>;
};
