import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { getBooksInProgress } from '../redux/booksSlice';

export default function Home() {
  const booksInProgress = useSelector(getBooksInProgress);

  return (
    <Box p={3}>
      <Typography variant='h5' mb={3}>
        Currently in progress
      </Typography>
      <Box display='flex' gap={2}>
        {booksInProgress.map((book) => (
          <Card key={book.id} sx={{ width: '320px' }}>
            <CardContent sx={{ padding: '24px' }}>
              <Typography variant='body1' fontWeight='bold'>
                {book.title}
              </Typography>
              <Typography variant='body1'>{book.author}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress
                    variant='determinate'
                    value={(book.progress / book.pageCount) * 100}
                  />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant='body2' color='text.secondary'>
                    {book.progress}/{book.pageCount}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
