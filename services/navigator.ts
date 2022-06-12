import { NextRouter } from 'next/router';

let _router: NextRouter;

const setTopRouter = (router: NextRouter) => {
  _router = router;
};

const navigate = (path: string, query = null) => {
  return _router.push({
    pathname: path,
    query: query,
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  setTopRouter,
  navigate,
};
