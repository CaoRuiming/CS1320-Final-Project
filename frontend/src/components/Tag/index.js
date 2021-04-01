import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import useStateService from '../../services/StateService';
import feedStyles from '../PostFeed/feedStyles.module.css';


export default function Tag(){ 

    return(
        <div className={feedStyles.tagItem}>tag</div>
    ); 

}