import React, { useState } from 'react';
import { getType, hasChild } from './util';

const JSONViewer = props => {

    const { jsonTemplate } = props;

    const showJSONPath = (path) => {
        document.getElementById('json-path').innerHTML = path
    }

    const hideType = ( sub_obj ) => {
        return '...' + getType(sub_obj)
    }

    const LoopRenderer = props => {

        const [ shows, setShows ] = useState([])
        const collapseEvt = index => {
            let temps = shows.slice()
            temps[index] = !temps[index]
            setShows(temps)
            console.log(shows.length, index)
        }
        const initShows = len => {
            let temps = new Array(len)
            for(let i=0;i<len;i++){
                temps[i] = true
            }
            setShows(temps)
        }
        const { obj, path } = props
        let obj_type = getType(obj)
        if(obj_type == 'Object') {
            let keys = Object.keys(obj)
            if(keys.length) {
                if(shows.length == 0) initShows(keys.length)
                return(
                    <>
                        &#123;
                        {
                            keys.map((sub_obj, index) => {
                                let temp_path = `${path}.${sub_obj}`
                                return(
                                    <div key={index} className="indent" test={index}>
                                        {
                                            hasChild(obj[sub_obj]) && <>
                                                <span className={shows[index]?"collapse-btn":"collapse-btn collapsed"} onClick={() => collapseEvt(index)} test={index}></span>
                                            </>
                                        }
                                        <span onClick={() => showJSONPath(path)}>&quot;{sub_obj}&quot;: </span>
                                        {
                                            shows[index] ? ( <>
                                                <span>< LoopRenderer obj={obj[sub_obj]} path={temp_path}/></span>
                                            </> ) : ( <>
                                                <span>< LoopRenderer obj={hideType(obj[sub_obj])} path={temp_path}/></span>
                                            </> )
                                        }
                                    </div>
                                )
                            })
                        }
                        &#125;
                    </>
                )
            } else {
                return(
                    <>
                        <span onClick={() => showJSONPath(path)}>&#123;&nbsp;&#125;</span>
                    </>
                )
            }
        } else if(obj_type == 'Array') {
            if(obj.length) {
                if(shows.length == 0) initShows(obj.length)
                return(
                    <>
                        &#91;
                        {
                            obj.map((sub_obj, index) => {
                                let temp_path = `${path}[${index}]`
                                return(
                                    <div key={index} className="indent">
                                        {
                                            hasChild(sub_obj) && <>
                                                <span className={shows[index]?"collapse-btn":"collapse-btn collapsed"} onClick={() => collapseEvt(index)} test={index}></span>
                                            </>
                                        }
                                        <span onClick={() => showJSONPath(path)}>{index}: </span>
                                        {
                                            shows[index] ? ( <>
                                                <span>< LoopRenderer obj={sub_obj} path={temp_path}/></span>
                                            </> ) : ( <>
                                                <span>< LoopRenderer obj={hideType(sub_obj)} path={temp_path}/></span>
                                            </> )
                                        }
                                    </div>
                                )
                            })
                        }
                        &#93;
                    </>
                )
            } else {
                return(
                    <>
                        <span onClick={() => showJSONPath(path)}>&#91;&nbsp;&#93;</span>
                    </>
                )
            }
        } else {
            return(
                <span onClick={() => showJSONPath(path)}>&quot;{obj}&quot;</span>
            )
        }
    }

    return(
        <>
            <div className='json-path-wrapper'>
                <div id='json-path'></div>
            </div>
            <LoopRenderer obj={jsonTemplate} path="$" />
        </>
    )

}

export default JSONViewer;