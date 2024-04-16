import React from 'react';

function FAQPage() {
  const styles = {
    details: {
      width: '80%',
      margin: '0 auto',
      background: 'orange',
      marginBottom: '.5rem',
      boxShadow: '0 .1rem 1rem -.5rem rgba(0,0,0,.4)',
      borderRadius: '5px',
      overflow: 'hidden',
    },
    summary: {
      color: 'orange',
      padding: '1rem',
      display: 'block',
      background: 'rgba(255, 255, 255, 0.813)',
      paddingLeft: '2.2rem',
      position: 'relative',
      cursor: 'pointer',
      userSelect: 'none',
    },
    summaryBefore: {
      content: '',
      borderWidth: '.4rem',
      borderStyle: 'solid',
      borderColor: 'transparent transparent transparent #fff',
      position: 'absolute',
      top: '1.3rem',
      left: '1rem',
      transform: 'rotate(0)',
      transformOrigin: '.2rem 50%',
      transition: '.25s transform ease',
    },
    detailsOpen: {
      transform: 'rotate(90deg)',
    },
    ul: {
      paddingBottom: '1rem',
      marginBottom: '0',
    },
    body: {
      background: '#cf711f',
      height: '100vh',
      fontFamily: 'sans-serif',
      color: 'white',
      lineHeight: '1.5',
      letterSpacing: '1px',
      marginTop: '2rem',
    },
  };

  return (
    <div style={styles.body}>
      <details style={styles.details}>
        <summary style={styles.summary}>What is a restaurant management system?</summary>
        <ul style={styles.ul}>
          <li>A restaurant management system is a software solution designed to streamline various aspects of restaurant operations, including order management, inventory tracking, table reservations, staff scheduling, and customer relationship management.</li>
        </ul>
      </details>
      <details style={styles.details}>
        <summary style={styles.summary}>What are the key features of a restaurant management system?</summary>
        <ul style={styles.ul}>
          <li>Key features typically include order management, table management, inventory management, staff scheduling, reporting and analytics, integration with point-of-sale (POS) systems, and customer relationship management (CRM) tools.</li>
        </ul>
      </details>
      <details style={styles.details}>
        <summary style={styles.summary}>How does a restaurant management system improve efficiency?</summary>
        <ul style={styles.ul}>
          <li>By automating tasks such as order taking, inventory tracking, and staff scheduling, a restaurant management system can save time and reduce errors. It also provides insights through analytics, helping to optimize operations and improve overall efficiency.</li>
        </ul>
      </details>
      <details style={styles.details}>
        <summary style={styles.summary}>Is a restaurant management system suitable for all types of restaurants?</summary>
        <ul style={styles.ul}>
          <li>Yes, restaurant management systems are designed to cater to a wide range of establishments, including fine dining restaurants, fast food chains, cafes, bars, and food trucks. The features can be customized to meet the specific needs of different types of restaurants.</li>
        </ul>
      </details>
      {/* <details style={styles.details}>
        <summary style={styles.summary}>Can a restaurant management system handle online orders and reservations?</summary>
        <ul style={styles.ul}>
          <li>Yes, many restaurant management systems offer integration with online ordering platforms and reservation systems. This allows customers to place orders or book tables online, which can help to increase sales and improve customer satisfaction.</li>
        </ul>
      </details> */}
    </div>
  );
}

export default FAQPage;
