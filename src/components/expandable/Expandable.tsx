import React, {
    createContext,
    useState,
    useMemo,
    useCallback,
    useEffect,
    useRef
  } from 'react'
  import Header from './Header'
  import Icon from './Icon'
  import Body from './Body'
  
  import './Expandable.css'
  
  export const ExpandableContext = createContext({} as any);
  const { Provider } = ExpandableContext
  
  const Expandable = ({shouldExpand, children, onExpand, className = '', ...otherProps }: any) => {
    const isExpandControlled = shouldExpand !== undefined;
    const [expanded, setExpanded] = useState(false);
    const getState = isExpandControlled ? shouldExpand : expanded;
    const toggle = useCallback(
      () => setExpanded(prevExpanded => !prevExpanded),
      []
    )
    const getToggle = isExpandControlled ? onExpand : toggle;
  
    const componentJustMounted = useRef(true) as any;
    useEffect(
      () => {
        if (!componentJustMounted && !isExpandControlled) {
          onExpand(expanded)
          componentJustMounted.current = false
        }
      },
      [expanded, onExpand, isExpandControlled],
    )
  
    const value = useMemo(() => ({ expanded: getState, toggle: getToggle }), [
      getState,
      getToggle
    ]);
    const combinedClassNames = ['Expandable', className].join('')
  
    return (
      <Provider value={value}>
        <div className={combinedClassNames} {...otherProps}>
          {children}
        </div>
      </Provider>
    )
  }
  
  Expandable.Header = Header
  Expandable.Body = Body
  Expandable.Icon = Icon
  
  export default Expandable
  