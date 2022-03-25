import React, { useEffect, useRef, useState } from 'react';
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
import useStateHandler from '../../Redux/useStateHandler';

interface genreInterface {
    genreName: string;
    genreId: string;
}

type answerOptions = {
    answerText: string;
    isCorrect: boolean;
}
const theme = createTheme();

const NewQuestionAdd = () => {
    const { genreDetails, successFulQuestionAdd, errorOnAddingQuestion, getAllGenreDetails, addNewQuestionQithGenreHandler } = useStateHandler();
    const [selectedGenre, setSelectedGenre] = useState<string | null>("General Knowledge");
    const [genreTextboxDisplay, setGenreTextboxDisplay] = useState<boolean>(false);
    
    const [questionText, setQuestionText] = useState<string>('');
    const [firstOption, setFirstOption] = useState<answerOptions>({answerText: '', isCorrect: false});
    const [secondOption, setSecondOption] = useState<answerOptions>({answerText: '', isCorrect: false});
    const [thirdOption, setThirdOption] = useState<answerOptions>({answerText: '', isCorrect: false});
    const [fourthOption, setFourthOption] = useState<answerOptions>({answerText: '', isCorrect: false});
    const [newGenre, setNewGenre] = useState<string>('');
    const [questionMark, setQuestionMark] = useState<number | null>(0);
    const [questionAllotedTime, setQuestionAllotedTime] = useState<number | null>(0);

    useEffect(() => {
        getAllGenreDetails();
    }, [])

    useEffect(()=>{
        if(selectedGenre === "other"){
           setGenreTextboxDisplay(true) 
        }else{
            setGenreTextboxDisplay(false);
            setNewGenre("");
        }
    },[selectedGenre])

    const checkCorrectNess = (inputValue: string): boolean => {
        const returnValue = (inputValue === "true") ? true : ((inputValue === "false") ? false : false)
        console.log(returnValue)
        return returnValue;
    }

    const submitNewQuestionHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        let answerOptions  = [];
        answerOptions.push(firstOption, secondOption, thirdOption, fourthOption);
        const dataToSend = {
            genreName: (newGenre !== '') ? newGenre : selectedGenre,
            questionText,
            questionMark,
            timeAlloted: questionAllotedTime,
            answerOptions
        }
        console.log(dataToSend)
        addNewQuestionQithGenreHandler(dataToSend);
        setSelectedGenre("General Knowledge");
        setQuestionText("");
        setQuestionMark(0);
        setQuestionAllotedTime(0);
        setNewGenre("");
        setFirstOption({answerText: '', isCorrect: false});
        setSecondOption({answerText: '', isCorrect: false});
        setThirdOption({answerText: '', isCorrect: false});
        setFourthOption({answerText: '', isCorrect: false});
    }
    useEffect(()=>{
        console.log(successFulQuestionAdd)
        console.log(errorOnAddingQuestion)
    },[successFulQuestionAdd, errorOnAddingQuestion])
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
                                        value={questionText}
                                        onChange={(e)=> setQuestionText(e.target.value)}
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
                                        onChange={(e)=>setFirstOption({...firstOption, answerText: e.target.value})}
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
                                        value={firstOption.isCorrect} 
                                        onChange={(e)=>setFirstOption({...firstOption, isCorrect: checkCorrectNess(e.target.value)})}
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
                                        value = {secondOption.answerText}
                                        onChange={(e)=>setSecondOption({...secondOption, answerText: e.target.value})}
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
                                        value={true}
                                        onChange={(e)=>setSecondOption({...secondOption, isCorrect: checkCorrectNess(e.target.value)})}
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
                                        value={thirdOption.answerText}
                                        onChange={(e)=>setThirdOption({...thirdOption, answerText: e.target.value})}
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
                                        value={thirdOption.isCorrect}
                                        onChange={(e)=>setThirdOption({...thirdOption, isCorrect: checkCorrectNess(e.target.value)})}
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
                                        value = {fourthOption.answerText}
                                        onChange= {(e)=>setFourthOption({...fourthOption, answerText: e.target.value})}
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
                                        value={fourthOption.isCorrect}
                                        onChange= {(e)=>setFourthOption({...fourthOption, isCorrect: checkCorrectNess(e.target.value)})}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <CustomSelect value={selectedGenre} onChange={setSelectedGenre}>
                                        {
                                            genreDetails?.map((item: genreInterface, index: number) => (
                                                <StyledOption key={ index } value={item?.genreName}>{item?.genreName}</StyledOption>
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
                                        value = {newGenre} onChange={(e)=>setNewGenre(e.target.value)}
                                    />
                                </Grid>
                                : " " }
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="questionMark"
                                        label="Enter Question Marks"
                                        name="questionMark"
                                        autoFocus
                                        value = {questionMark}
                                        onChange={(e)=> setQuestionMark(parseInt(e.target.value))}
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
                                        value = {questionAllotedTime}
                                        onChange={(e)=>setQuestionAllotedTime(parseInt(e.target.value))}
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