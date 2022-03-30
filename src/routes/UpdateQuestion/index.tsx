import React, { useEffect, useRef, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StyledOption, CustomSelect } from '../AddNewQuestion/selectStyle';
import useStateHandler from '../../Redux/useStateHandler';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

interface genreInterface {
    genreName: string;
    genreId: string;
}

type answerOptions = {
    answerText: string;
    isCorrect: boolean;
}

interface questionType {
    questionId: number;
    questionText: string;
    questionMark: number;
    timeAlloted: number;
    answerOptions: answerOptions[];
    genreName: string;
}

const theme = createTheme();

const UpdateQuestion = () => {
    const questionId = useParams().questionId;
    const { genreDetails, successFulUpdation, errorOnUpdation, singleQuestion, getSingleQuestionHandler, updationClearenceHandler, getAllGenreDetails, addNewQuestionWithGenreHandler, allQuestions, updateQuestionHandler } = useStateHandler();
    const [questionSelected, setQuestionSelected] = useState<questionType>();
    const [selectedGenre, setSelectedGenre] = useState<string | null>("General Knowledge");
    const [genreTextboxDisplay, setGenreTextboxDisplay] = useState<boolean>(false);

    const [questionText, setQuestionText] = useState<string>('');
    const [firstOption, setFirstOption] = useState<answerOptions>({ answerText: '', isCorrect: false });
    const [secondOption, setSecondOption] = useState<answerOptions>({ answerText: '', isCorrect: false });
    const [thirdOption, setThirdOption] = useState<answerOptions>({ answerText: '', isCorrect: false });
    const [fourthOption, setFourthOption] = useState<answerOptions>({ answerText: '', isCorrect: false });
    const [newGenre, setNewGenre] = useState<string>('');
    const [questionMark, setQuestionMark] = useState<string>('');
    const [questionAllotedTime, setQuestionAllotedTime] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [successOpen, setsuccessOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        getAllGenreDetails();
    }, [])

    useEffect(()=>{
        if(singleQuestion){
            setQuestionText(singleQuestion?.questionText!);
            setSelectedGenre(singleQuestion?.genreName!);
            setFirstOption({answerText: singleQuestion?.answerOptions[0]?.answerText!, isCorrect:singleQuestion?.answerOptions[0]?.isCorrect!});
            setSecondOption({answerText: singleQuestion?.answerOptions[1]?.answerText!, isCorrect:singleQuestion?.answerOptions[1]?.isCorrect!});
            setThirdOption({answerText: singleQuestion?.answerOptions[2]?.answerText!, isCorrect:singleQuestion?.answerOptions[2]?.isCorrect!});
            setFourthOption({answerText: singleQuestion?.answerOptions[3]?.answerText!, isCorrect:singleQuestion?.answerOptions[3]?.isCorrect!});
            setQuestionMark(singleQuestion?.questionMark?.toString()!);
            setQuestionAllotedTime(singleQuestion?.timeAlloted?.toString()!);
        }
    },[singleQuestion])

    useEffect(()=>{
        if(questionId!==undefined){
            getSingleQuestionHandler(parseInt(questionId!));
        }
    },[questionId])

    useEffect(() => {
        if (selectedGenre === "other") {
            setGenreTextboxDisplay(true)
        } else {
            setGenreTextboxDisplay(false);
            setNewGenre("");
        }
    }, [selectedGenre])

    const checkCorrectNess = (inputValue: string): boolean => {
        const returnValue = (inputValue === "true") ? true : ((inputValue === "false") ? false : false)
        console.log(returnValue)
        return returnValue;
    }

    const submitNewQuestionHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        let answerOptions = [];
        answerOptions.push(firstOption, secondOption, thirdOption, fourthOption);
        if (questionText !== '' && !Number.isNaN(parseInt(questionMark)) && !Number.isNaN(parseInt(questionAllotedTime)) && (firstOption.answerText !== "" && secondOption.answerText !== "" && thirdOption.answerText !== "" && fourthOption.answerText !== "")) {
            const dataToSend = {
                questionId: parseInt(questionId!),
                genreName: (newGenre !== '') ? newGenre : selectedGenre,
                questionText,
                questionMark: parseInt(questionMark),
                timeAlloted: parseInt(questionAllotedTime),
                answerOptions
            }
            console.log(dataToSend)
            updateQuestionHandler(dataToSend);
        } else {
            if (questionText === '') {
                setError("Please Enter Question Text To Submit!");
            } else if (Number.isNaN(parseInt(questionMark))) {
                setError("Please Add Proper Marks For The Question!");
            } else if (Number.isNaN(parseInt(questionAllotedTime))) {
                setError("Please Provide Proper Time For The Question!");
            } else if(firstOption.answerText === "" || secondOption.answerText === "" || thirdOption.answerText === "" || fourthOption.answerText === ""){
                setError("Please Provide All Four Options For The Question!");
            }else {
                setError("Please Enter All Fields Correctly!");
            }
        }
    }
    useEffect(() => {
        if (error !== '') {
            setOpen(true);
        }
    }, [error])
    useEffect(() => {
        if (success !== '') {
            setsuccessOpen(true);
        }
    }, [success])
    useEffect(()=>{
        if (errorOnUpdation !== "") {
            setError(errorOnUpdation);
        }
        if (successFulUpdation !== "") {
            setSuccess(successFulUpdation);
        }
        updationClearenceHandler();
    }, [errorOnUpdation, successFulUpdation])
    const handleClose = () => {
        setOpen(false);
        setsuccessOpen(false);
        setError('');
        setSuccess('');
    }
    return (
        <div>
            <div style={{ height: "30px", width: "100%" }}>
                <div style={{ float: "right" }} onClick={() => navigate("/dashboard")}>
                    <Tooltip title="Go To Dashboard" arrow TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                        <IconButton><HomeIcon fontSize='large' /></IconButton>
                    </Tooltip>
                </div>
            </div>
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
                            Update Details Of The New Question
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
                                        value={questionText}
                                        onChange={(e) => setQuestionText(e.target.value)}
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
                                        value={firstOption.answerText}
                                        onChange={(e) => setFirstOption({ ...firstOption, answerText: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Select
                                        value={firstOption.isCorrect}
                                        style={{marginTop: "15px"}}
                                        onChange={(e) => setFirstOption({ ...firstOption, isCorrect: checkCorrectNess(e.target.value as string) })}
                                    >
                                        <MenuItem value={"true"}>True</MenuItem>
                                        <MenuItem value={"false"}>False</MenuItem>
                                    </Select>
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
                                        value={secondOption.answerText}
                                        onChange={(e) => setSecondOption({ ...secondOption, answerText: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Select
                                        value={secondOption.isCorrect}
                                        style={{marginTop: "15px"}}
                                        onChange={(e) => setSecondOption({ ...secondOption, isCorrect: checkCorrectNess(e.target.value as string) })}
                                    >
                                        <MenuItem value={"true"}>True</MenuItem>
                                        <MenuItem value={"false"}>False</MenuItem>
                                    </Select>
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
                                        value={thirdOption.answerText}
                                        onChange={(e) => setThirdOption({ ...thirdOption, answerText: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Select
                                        value={thirdOption.isCorrect}
                                        style={{marginTop: "15px"}}
                                        onChange={(e) => setThirdOption({ ...thirdOption, isCorrect: checkCorrectNess(e.target.value as string) })}
                                    >
                                        <MenuItem value={"true"}>True</MenuItem>
                                        <MenuItem value={"false"}>False</MenuItem>
                                    </Select>
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
                                        value={fourthOption.answerText}
                                        onChange={(e) => setFourthOption({ ...fourthOption, answerText: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Select
                                        value={fourthOption.isCorrect}
                                        style={{marginTop: "15px"}}
                                        onChange={(e) => setFourthOption({ ...fourthOption, isCorrect: checkCorrectNess(e.target.value as string) })}
                                    >
                                        <MenuItem value={"true"}>True</MenuItem>
                                        <MenuItem value={"false"}>False</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12} >
                                    <CustomSelect value={selectedGenre} onChange={setSelectedGenre}>
                                        {
                                            genreDetails?.map((item: genreInterface, index: number) => (
                                                <StyledOption key={index} value={item?.genreName}>{item?.genreName}</StyledOption>
                                            ))
                                        }
                                        <StyledOption value={"other"}>Other</StyledOption>
                                    </CustomSelect>
                                </Grid>
                                {
                                    genreTextboxDisplay ?
                                        <Grid item xs={12} >
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="genreName"
                                                label="Enter Genre Name"
                                                name="genreName"
                                                autoFocus
                                                value={newGenre} onChange={(e) => setNewGenre(e.target.value)}
                                            />
                                        </Grid>
                                        : " "}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="questionMark"
                                        label="Enter Question Marks"
                                        name="questionMark"
                                        autoFocus
                                        type="number"
                                        value={questionMark}
                                        onChange={(e) => setQuestionMark(e.target.value)}
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
                                        type="number"
                                        value={questionAllotedTime}
                                        onChange={(e) => setQuestionAllotedTime(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={(e) => submitNewQuestionHandler(e)}
                            >
                                Update Question
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
            <Snackbar open={open} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar open={successOpen} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {success}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default UpdateQuestion;