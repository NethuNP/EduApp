// import React, { useState } from 'react';
// import {
//   Button,
//   CircularProgress,
//   Typography,
//   Box
// } from '@mui/material';
// import FilePresentIcon from '@mui/icons-material/FilePresent';
// import { styled } from '@mui/system';

// type DocumentViewerProps = {
//   url: string;
//   style?: React.CSSProperties;
// };

// const Iframe = styled('iframe')({
//   width: '100%',
//   height: '100%',
//   border: 'none',
// });

// export const DocumentViewer: React.FC<DocumentViewerProps> = ({ url, style }) => {
//   const [isLoading, setIsLoading] = useState(true);

//   const isImage = url.includes('image') || url.endsWith('.jpg') || url.endsWith('.png');
//   const isCloudinary = url.includes('cloudinary');

//   const handleExternalOpen = () => {
//     try {
//       window.open(url, '_blank');
//     } catch (e) {
//       alert('No app found to open this document');
//     }
//   };

//   return (
//     <Box sx={{ position: 'relative', width: '100%', height: '100%', ...style }}>
//       {isLoading && (
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             zIndex: 1,
//           }}
//         >
//           <CircularProgress />
//         </Box>
//       )}

//       {isImage ? (
//         <img
//           src={url}
//           alt="Document"
//           style={{ width: '100%', height: 'auto' }}
//           onLoad={() => setIsLoading(false)}
//           onError={() => setIsLoading(false)}
//         />
//       ) : isCloudinary ? (
//         <Iframe
//           src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`}
//           onLoad={() => setIsLoading(false)}
//         />
//       ) : (
//         <Box textAlign="center" padding={2}>
//           <Button
//             onClick={handleExternalOpen}
//             variant="contained"
//             startIcon={<FilePresentIcon />}
//             sx={{ borderRadius: 2, boxShadow: 3 }}
//           >
//             <Typography variant="button">Open Document</Typography>
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };
