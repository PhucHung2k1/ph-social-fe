import { useAppSelector } from '@/store/hook';
import CircularProgress from '@mui/material/CircularProgress';

function PrevLoader() {
  const showLoading = useAppSelector((state) => state.loadingSlice.isLoading);

  return showLoading ? (
    <div className="fixed inset-0 h-screen w-screen cursor-wait ">
      <div className="relative flex h-full w-full items-center justify-center">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
          }}
        />
        <CircularProgress className="h-24 w-24" />
      </div>
    </div>
  ) : (
    <></>
  );
}

export default PrevLoader;
