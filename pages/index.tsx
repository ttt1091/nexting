import Head from 'next/head'
import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.scss'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

var headline = [];

var data = [
  { title: "news1", url: "/images/dummy-001.jpg", width: "400", height: "600" },
  { title: "news2", url: "/images/dummy-002.jpg", width: "400", height: "533"  },
  { title: "news3", url: "/images/dummy-003.jpg", width: "400", height: "269"  },
  { title: "news4", url: "/images/dummy-004.jpg", width: "400", height: "266"  },
  { title: "news5", url: "/images/dummy-005.jpg", width: "400", height: "600"  }
];

for(var i in data){
  headline.push(
  <dl className={utilStyles.headlineItem}>
    <dt>{data[i].title}</dt>
    <dd>
      <Image
        priority
        quality={1}
        src={data[i].url}
        width={data[i].width}
        height={data[i].height}
      ></Image>
    </dd>
  </dl>
  );
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headline}>
        <div className={utilStyles.headlineItems}>
          {headline}
        </div>
      </section>
      <section className={utilStyles.headingMd}>
      </section>
      <section className={`${utilStyles.headingMd}`}>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
