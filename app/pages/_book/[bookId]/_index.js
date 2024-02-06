import styles from '@/app/page.module.css';
import Drawer from '@/app/_components/drawer';

import * as React from 'react';

function Page({ params }) {


  return (
    <div className={styles.container}>

        <div>My Post: {params.bookId}</div>
        <Drawer/>

    </div>
  );
}



export default Page;
