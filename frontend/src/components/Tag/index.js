import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import useStateService from '../../services/StateService';
import feedStyles from '../PostFeed/feedStyles.module.css';


export default function Tag(){ 

    return(
        <Link href="/" className={feedStyles.linkStyle}>
            <div className={feedStyles.tagItem}></div>
        </Link>
    ); 

}