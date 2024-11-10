import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import style from './[id].module.css';
import fetchOneBook from '@/lib/fetch-one-book';
import { useRouter } from 'next/router';

// 동적 경로가 쓰이는 페이지에서 SSG방식을 사용하려면 getStaticPaths를 설정해줘야 한다.
export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    fallback: true,
    // fallback : false => notFound (404 페이지) 반환
    // fallback : 'blocking' => 즉시 생성(SSR방식) / 사전에 생성되지 않은 페이지를 반환시, 시간 소요가 많을 수 있음
    // fallback : true => 데이터가 없는 페이지만 우선 반환 후에 props만 따로 반환
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext
) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  // book 데이터가 존재하지 않을 경우, 404페이지 반환
  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // fallback 상태 설정
  const router = useRouter();
  if (router.isFallback) return '로딩중입니다!';

  const {
    id,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  } = book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{
          backgroundImage: `url('${coverImgUrl}')`,
        }}>
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
