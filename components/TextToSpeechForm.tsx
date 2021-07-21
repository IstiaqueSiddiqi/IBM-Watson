import React, { FC, memo, useState } from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { Box, FormControl, FormHelperText, Input, Theme } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { useForm } from 'react-hook-form';
import { cacheName } from '../pages';

interface IProps {
    setHistoryList: any;
};

interface IFormDefinition {
    textToSpeechInput: string;
};

const TextToSpeechForm: FC<IProps> = props => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IFormDefinition>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const { setHistoryList } = props;

    const onSubmit = async (formData: IFormDefinition) => {
        try {
            setLoading(true);

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'audio/mpeg');
            headers.append('X-Watson-Learning-Opt-Out', 'true');
            headers.append('Cache-Control', 'public, max-age=86400'); // cache for 24h

            const cache = await caches.open(cacheName);
            const requestUrl = `/api/synthesize?${encodeURIComponent("text")}=${encodeURIComponent(formData.textToSpeechInput)}`;
            const request = new Request(requestUrl);

            let response = await cache.match(request);

            if (!response) {
                // If not found in cache call api & cache it
                response = await fetch(requestUrl, { headers, cache: "no-cache" });
                
                if (response.ok) {
                    cache.put(request, response.clone());
                    setHistoryList((oldState: Request[]) => [...oldState, request]);
                }
            }

            // play cached mp3
            new Audio(request.url).play();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            reset();
        }
    };

    return (
        <>
            <FormControl variant="standard" fullWidth margin="dense" size="small">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box display="flex" flexDirection="row">
                        <Box mr={2} flexGrow={1}>
                            <Input
                                fullWidth
                                disableUnderline
                                id="textToSpeechInput"
                                placeholder="Max 50 chars"
                                type="text"
                                error={true}
                                {...register("textToSpeechInput", { required: true, maxLength: 50 })}
                            />
                        </Box>
                        <LoadingButton
                            loading={isLoading}
                            loadingPosition="start"
                            startIcon={<PlayArrowIcon />}
                            variant="outlined"
                            color="secondary"
                            size="small"
                            type="submit"
                        >
                            Speak
                        </LoadingButton>
                    </Box>

                    {errors.textToSpeechInput && (
                        <FormHelperText id="helperText">Cannot be empty & max 50 chars allowed.</FormHelperText>
                    )}
                </form>
            </FormControl>
        </>
    )
};

export default memo(TextToSpeechForm);