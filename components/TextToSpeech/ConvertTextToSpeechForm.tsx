import React, { memo, useState } from 'react';
import IHistory from './IHistory.model';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import LoadingButton from '@material-ui/lab/LoadingButton';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useForm } from 'react-hook-form';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';

interface IProps {
    historyList: IHistory[];
    setHistoryList: any;
};

interface IFormDefinition {
    textToSpeechInput: string;
};

const ConvertTextToSpeechForm = (props: IProps) => {

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IFormDefinition>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const { historyList, setHistoryList } = props;

    const onSubmit = async (formData: IFormDefinition) => {
        try {
            setLoading(true);
            const { cacheName, playAudio } = await import('../../util');

            const arrayList = historyList;
            const requestUrl = `/api/synthesize?${encodeURIComponent("text")}=${encodeURIComponent(formData.textToSpeechInput)}`;
            const request = new Request(requestUrl);

            const item = arrayList.find(eachItem => request.url === eachItem.request.url);
            let response = item?.response;

            if (!response) {
                const headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Accept', 'audio/mpeg');
                headers.append('X-Watson-Learning-Opt-Out', 'true');
                headers.append('Cache-Control', 'public, max-age=86400'); // cache for 24h
                // If not found in cache call api & cache it
                response = await fetch(requestUrl, { headers, cache: "no-cache" });

                if (!response.ok) throw Error(await response.json());

                const cache = await caches.open(cacheName);
                cache.put(request, response.clone());
                setHistoryList((prevList: IHistory[]) => [{ request, response }, ...prevList]);
            }

            // play cached mp3
            const buffer: any = await response?.clone().arrayBuffer();
            playAudio(buffer);
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
                                id="textToSpeechInput"
                                placeholder="Type your text..."
                                type="text"
                                {...register("textToSpeechInput", { required: true, maxLength: 50 })}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                }
                                color="secondary"
                            />
                        </Box>
                        <LoadingButton
                            loading={isLoading}
                            loadingPosition="start"
                            startIcon={<SendIcon />}
                            variant="outlined"
                            color="secondary"
                            size="small"
                            type="submit"
                        >
                            Speak
                        </LoadingButton>
                    </Box>

                    {errors.textToSpeechInput && (
                        <FormHelperText id="helperText">Cannot be empty & max 50 characters allowed.</FormHelperText>
                    )}
                </form>
            </FormControl>
        </>
    )
};

export default memo(ConvertTextToSpeechForm);