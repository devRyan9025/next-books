import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import style from './searchable-layout.module.css';

export default function SearchableLayouyt({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const q = router.query.q as string;

  // 사용자가 입력한 값이 서치바에 유지되게 하는 기능
  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  // 사용자가 입력한 값을 실시간으로 보여주는 함수
  const onChangeSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(e.target.value);
  };

  // 입력한 값을 쿼리스트링으로 가지고 search 페이지로 이동시키는 함수
  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  // 사용자가 키보드 입력으로도 데이터 전송
  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세요..."
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
