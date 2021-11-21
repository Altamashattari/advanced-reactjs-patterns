import React, { useState } from 'react'
import './App.css'
import Expandable from './components/expandable/Expandable';
import useEffectAfterMount from './hooks/useEffectAfterMount';
import useExpanded from './hooks/useExpanded';

const information = [
  {
    header: 'Why everyone should live forrever',
    note: 'This is highly sensitive information ... !!!!'
  },
  {
    header: 'The internet disappears',
    note:
      'I just uncovered the biggest threat...'
  },
  {
    header: 'The truth about Elon musk and Mars!',
    note: 'Nobody tells you this...'
  }
]

function App() {
  const [activeIndex, setActiveIndex] = useState<any>(null);
  const onExpand = (evt: any) => setActiveIndex(evt.target.dataset.index);
  const { expanded, toggle } = useExpanded();

  useEffectAfterMount(
    () => {
      // user can perform any side effect here 👇
      console.log('Yay! button was clicked!!')
    },
    [expanded]
  );

  return (
    <div className='App'>
      {information.map(({ header, note }, index) => (
        <Expandable
          shouldExpand={index === +activeIndex}
          onExpand={onExpand}
          key={index}
        >
          <Expandable.Header
            data-index={index}
          >{header}</Expandable.Header>
          <Expandable.Icon />
          <Expandable.Body>
            <img
              src='https://www.freecodecamp.org/news/content/images/size/w2000/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png'
              style={{ width: '250px' }}
              alt='reintroducing react book cover'
            />
            <p style={{ opacity: 0.7 }}>
              {note} <br />
              <a
                href='https://leanpub.com/reintroducing-react'
                target='_blank'
                rel='noopener noreferrer'
              >
                Go get it now.
              </a>
            </p>
          </Expandable.Body>
        </Expandable>
      ))}
      <div style={{ marginTop: '3rem' }}>
        <button onClick={toggle}>Click to view awesomeness...</button>
        {expanded ? <p>{'😎'.repeat(50)}</p> : null}
      </div>
    </div>
  )
}

export default App
