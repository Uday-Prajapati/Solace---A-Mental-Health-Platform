import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from '@mui/material';
import { EmojiEmotions, SentimentDissatisfied, SentimentSatisfied, SentimentVeryDissatisfied, MoodBad, Mood } from '@mui/icons-material';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip'; // Import Flip plugin for advanced animations
import '../styles/Depression.css';

// Register GSAP plugins
gsap.registerPlugin(Flip);

const Depression = () => {
  const [answers, setAnswers] = useState(Array(10).fill(0)); // Initialize answers with zero
  const [score, setScore] = useState(null); // State to hold the total score
  const resultRef = useRef(null); // Ref for the result section
  const questionRefs = useRef([]); // Refs for each question
  const emojiRef = useRef(null); // Ref for the emoji

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = parseInt(value); // Update the answer for the specific question
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    const totalScore = answers.reduce((acc, curr) => acc + curr, 0);
    const maxPossibleScore = 30; // 10 questions * 3 (max value per question)
    const percentageScore = ((totalScore / maxPossibleScore) * 100).toFixed(2); // Calculate percentage
    setScore(percentageScore);
  };

  const interpretScore = (percentage) => {
    if (percentage >= 0 && percentage <= 20) return { level: 'Minimal', emoji: <Mood color="success" fontSize="large" /> };
    if (percentage > 20 && percentage <= 40) return { level: 'Mild', emoji: <SentimentSatisfied color="info" fontSize="large" /> };
    if (percentage > 40 && percentage <= 60) return { level: 'Moderate', emoji: <SentimentDissatisfied color="warning" fontSize="large" /> };
    if (percentage > 60 && percentage <= 80) return { level: 'Moderate-Severe', emoji: <SentimentVeryDissatisfied color="error" fontSize="large" /> };
    if (percentage > 80 && percentage < 100) return { level: 'Severe', emoji: <MoodBad color="error" fontSize="large" /> };
    if (percentage === 100) return { level: 'Extremely Severe', emoji: <EmojiEmotions color="error" fontSize="large" /> };
    return { level: 'Score not calculated', emoji: '❓' };
  };

  const { level, emoji } = interpretScore(score);

  // GSAP Animations
  useEffect(() => {
    // Animate form questions on mount
    gsap.from(questionRefs.current, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, []);

  useEffect(() => {
    if (score !== null) {
      // Animate the result section using Flip
      gsap.fromTo(
        resultRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );

      // Floating emoji animation
      gsap.to(emojiRef.current, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'power1.inOut',
      });
    }
  }, [score]);

  return (
    <div className="depression-container">
      <div className="depression-content">
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'transparent',
              boxShadow: 'none',
            }}
          >
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#fff', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              Depression Test
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4, color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
              In the LAST TWO WEEKS, how often have you been bothered by any of the following problems? Please note, all fields are required.
            </Typography>

            <Box component="form" sx={{ mb: 4 }}>
              {[
                "Little interest or pleasure in doing things",
                "Feeling down, depressed, or hopeless",
                "Trouble falling or staying asleep, or sleeping too much",
                "Feeling tired or having little energy",
                "Poor appetite or overeating",
                "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
                "Trouble concentrating on things, such as reading the newspaper or watching television",
                "Moving or speaking so slowly that other people could have noticed or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
                "Thoughts that you would be better off dead, or of hurting yourself",
                "If you checked off any problems, how difficult have these problems made it for you at work, home, or with other people?"
              ].map((question, index) => (
                <FormControl
                  fullWidth
                  key={index}
                  sx={{ 
                    mb: 3, 
                    background: 'transparent',
                    borderRadius: 2, 
                    p: 2, 
                    boxShadow: 'none',
                    border: 'none',
                    '&:hover': {
                      background: 'transparent',
                      boxShadow: 'none',
                    }
                  }}
                  ref={(el) => (questionRefs.current[index] = el)}
                >
                  <InputLabel sx={{ 
                    fontWeight: '500', 
                    color: '#fff',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                  }}>{index + 1}. {question}</InputLabel>
                  <Select
                    value={answers[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    label={`${index + 1}. ${question}`}
                    required
                    sx={{
                      background: 'transparent',
                      borderRadius: 2,
                      color: '#fff',
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '.MuiSvgIcon-root': {
                        color: '#fff',
                      },
                      '.MuiSelect-select': {
                        color: '#fff',
                      },
                      '.MuiMenuItem-root': {
                        color: '#fff',
                      }
                    }}
                  >
                    <MenuItem value={0}>Not at all</MenuItem>
                    <MenuItem value={1}>Several days</MenuItem>
                    <MenuItem value={2}>More than half the days</MenuItem>
                    <MenuItem value={3}>Nearly every day</MenuItem>
                  </Select>
                </FormControl>
              ))}
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={calculateScore}
              sx={{
                py: 2,
                background: 'linear-gradient(145deg, #3498db, #2980b9)',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              Submit
            </Button>

            {score !== null && (
              <Box
                ref={resultRef}
                sx={{
                  mt: 4,
                  textAlign: 'center',
                  background: 'transparent',
                  borderRadius: 2,
                  p: 3,
                  boxShadow: 'none',
                  border: 'none',
                }}
              >
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#fff', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                  Your Score: {score}%
                </Typography>
                <Box ref={emojiRef} sx={{ my: 2 }}>
                  {emoji}
                </Box>
                <Typography variant="h5" sx={{ color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
                  Interpretation: {level}
                </Typography>
              </Box>
            )}
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default Depression;