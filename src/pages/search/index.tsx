import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import BookItem from '@/components/book-item';
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import fetchBooks from '@/lib/fetch-books';

// SSR 방식
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q;
  const books = await fetchBooks(q as string);

  return {
    props: { books },
  };
};

export default function Page({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // SSG 방식
  // const [books, setBooks] = useState<BookData[]>([]);

  // const router = useRouter();
  // const q = router.query.q;

  // const fetchSearchResult = async () => {
  //   const data = await fetchBooks(q as string);
  //   setBooks(data);
  // };

  // useEffect(() => {
  //   if (q) {
  //     fetchSearchResult();
  //   }
  // }, [q]);

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
