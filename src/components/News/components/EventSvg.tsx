'use client';

import React from 'react';

import CommentarySvg from 'components/News/svg/commentary.svg';

import scss from 'components/News/News.module.scss';

export const EventSvg = () => {
    return (
        <div className={scss.event_svg_wrapper}>
            <CommentarySvg className={scss.event_svg} />
        </div>
    );
};
