import { Input } from 'https://deno.land/x/cliffy/prompt/mod.ts';
import dayjs from 'https://cdn.skypack.dev/dayjs@v1.10.7';

const format = 'DDMMYYYY';

// function that reverses a string
const reverse = (str: string): string => {
    return str.split('').reverse().join('');
}

const main = async () => {
    let palindromes = 0;
    let ambigrams = 0;

    const startDate: string = await Input.prompt(`Start Date:`);
    const _startDate = startDate.toLowerCase() === 'today' ? dayjs() : dayjs(startDate);

    const endDate: string = await Input.prompt(`End Date:`);
    const _endDate = endDate.toLowerCase() === 'today' ? dayjs() : dayjs(endDate);

    if (!_startDate.isValid()) {
        console.error('Invalid start date');
        return;
    }

    if (!_endDate.isValid()) {
        console.error('Invalid end date');
        return;
    }

    for (let d = _startDate; d <= dayjs(); d = d.add(1, 'day')) {
        const formatted = d.format(format);
        if (formatted === reverse(formatted)) {
            console.log(formatted);
            palindromes++;

            const regex = /[0258]{8}/g;
            if (regex.test(formatted)) {
                ambigrams++;
            }
        }
    }

    console.log(`Palindromes: ${palindromes}`);
    console.log(`Ambigrams: ${ambigrams}`);
}

await main();
