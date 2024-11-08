// CSS module
import SearchableLayouyt from '@/components/searchable-layout';
import style from './index.module.css';
import { ReactNode } from 'react';
import BookItem from '@/components/book-item';
import { InferGetServerSidePropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';

// SSR 설정하기 : 컴포넌트보다 먼저 실행되어서, 컴포넌트의 필요한  데이터를 불러오는 함수
export const getServerSideProps = async () => {
  // 병렬로 데이터 fetching 하기
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};

export default function Home({
  allBooks,
  recoBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

// javascript에서 함수들은 사실상 객체로 인식되기 때문에, 메서드를 사용 가능
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayouyt>{page}</SearchableLayouyt>;
};
