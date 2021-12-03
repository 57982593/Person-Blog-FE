import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import store from './store';
import { add, back } from './action';
import { createUseStyles } from 'react-jss';
import { WithComponent, A } from '../learn/hoc';
import * as reactRedux from 'react-redux';

const useReduxStyle = createUseStyles( {
  rNumContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rTitleCenter: {
    textAlign: 'center',
  }
} );

const ViewNumContainer = () => {
  const reduxStyle = useReduxStyle();
  const [ , setNum ] = useState( {} );
  console.log( reactRedux.Provider );

  function addClick() {
    //调用action 更新数据
    store.dispatch( add() );
  }

  function backClick() {
    store.dispatch( back() );
  }

  /*useEffect的返回值用来在组件销毁时做些什么...*/
  useEffect( () => {
    /*监听state改边,subscribe会返回一个函数用来销毁监听*/
    const unsubscribe = store.subscribe( () => {
      console.log( 111, store.getState() );
      //当数据改变时需要修改组件状态来重新渲染组件
      setNum( {} );
    } );
    return () => {
      // TODO 销毁时会调用，但是经测试没有触发，暂时未找到原因
      console.log( '我被销毁了' );
      //销毁监听
      unsubscribe();
    };
  } );
  return (
      <div className={ reduxStyle.rNumContainer }>
        <div>
          <h1 className={ reduxStyle.rTitleCenter }>{ store.getState().num }</h1>
          <Space>
            <Button type={ 'primary' } onClick={ addClick }>+</Button>
            <Button onClick={ backClick }>-</Button>
          </Space>
          <div>{ WithComponent( A, 'test' ) }</div>
        </div>
      </div>
  );
};

export {
  ViewNumContainer,
};



