import React from 'react';
import useStateHandler from '../../Redux/useStateHandler';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StyledOption, CustomSelect } from './selectStyle';

const theme = createTheme();

const NewQuestionAdd = () => {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Add New Question
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="questionText"
                                        label="Enter Question"
                                        name="question"
                                        autoFocus

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Option 1 Answer"
                                        label="Option 1 Answer"
                                        name="Option 1 Answer"
                                        autoFocus

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Option 1 CorrectNess"
                                        label="Option 1 CorrectNess"
                                        name="Option 1 CorrectNess"
                                        autoFocus

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Option 2 Answer"
                                        label="Option 2 Answer"
                                        name="Option 2 Answer"
                                        autoFocus

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Option 2 CorrectNess"
                                        label="Option 2 CorrectNess"
                                        name="Option 2 CorrectNess"
                                        autoFocus

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Option 3 Answer"
                                        label="Option 3 Answer"
                                        name="Option 3 Answer"
                                        autoFocus

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Option 3 CorrectNess"
                                        label="Option 3 CorrectNess"
                                        name="Option 3 CorrectNess"
                                        autoFocus

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Option 4 Answer"
                                        label="Option 4 Answer"
                                        name="Option 4 Answer"
                                        autoFocus

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Option 4 CorrectNess"
                                        label="Option 4 CorrectNess"
                                        name="Option 4 CorrectNess"
                                        autoFocus

                                    />
                                </Grid>
                                {/* API Call Results Will Be Stored Here  */}
                                <Grid item xs={12} >
                                    <CustomSelect defaultValue={"General Knowledge"}>
                                        <StyledOption value={"General Knowledge"}>General Knowledge</StyledOption>
                                        <StyledOption value={"JavaScript"}>JavaScript</StyledOption>
                                    </CustomSelect>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="questionMark"
                                        label="Enter Question Marks"
                                        name="questionMark"
                                        autoFocus

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="allotedTime"
                                        label="Enter Alloted Time"
                                        name="allotedTime"
                                        autoFocus

                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            // onClick={(e) => loginHandler(e)}
                            >
                                Add Question
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default NewQuestionAdd;