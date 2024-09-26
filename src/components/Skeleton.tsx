import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props: any) => {
  return (
    <div>
      <ContentLoader
        speed={2}
        width={336}
        height={34}
        viewBox="0 0 336 34"
        backgroundColor="#dfdddd"
        foregroundColor="#ecebeb"
        {...props}>
        <rect x="0" y="270" rx="10" ry="10" width="280" height="27" />
        <rect x="0" y="320" rx="15" ry="15" width="280" height="88" />
        <rect x="95" y="416" rx="24" ry="24" width="182" height="45" />
        <rect x="0" y="426" rx="10" ry="10" width="65" height="30" />
        <rect x="4" y="7" rx="6" ry="6" width="16" height="16" />
        <rect x="29" y="6" rx="3" ry="3" width="204" height="18" />
        <rect x="238" y="0" rx="5" ry="5" width="90" height="34" />
      </ContentLoader>
    </div>
  );
};

export default Skeleton;
