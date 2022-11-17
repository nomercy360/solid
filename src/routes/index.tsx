import {createEffect, createResource, createSignal, For} from "solid-js";
import {useRouteData} from "@solidjs/router";

type Character = {
    id: number
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: Origin
    location: Location
    image: string
    episode: string[]
    url: string
    created: string
}

type Origin = {
    name: string
    url: string
}

type Location = {
    name: string
    url: string
}

export function routeData() {
    const [students] = createResource(async () => {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const res = await response.json();
        return res.results as Character[];
    });

    return {students};
}


export default function Home() {
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const [count, setCount] = createSignal(0);
    const {students} = useRouteData<typeof routeData>();

    createEffect(() => {
        window.Telegram.WebApp.MainButton.isVisible = true;
        window.Telegram.WebApp.MainButton.setParams({
            text: 'Get random number',
        });
        window.Telegram.WebApp.MainButton.onClick(result => {
            setCount(randInt(0, 100));
        });
    });
    return (
        <main class="text-center mx-auto text-gray-700 p-4">
            <h1 class="text-4xl font-bold">Random number</h1>
            <p class="text-xl">Click the button below to get a random number</p>

            <div class="mt-4">
                <span class="text-4xl font-bold">{count()}</span>
            </div>

            <ul>
                <For each={students()}>
                    {(student) => <li class='flex items-start gap-2 mb-4 text-neutral-100'>
                        <img class='w-24 h-24 rounded-lg' src={student.image} alt={student.name}/>
                        {/* if alive bg-green else red*/}
                        <div class='flex flex-col justify-between'>
                            <div class='flex flex-col'>
                                <span class='text-xl font-bold'>{student.name}</span>
                                <span class='text-sm'>{student.status}</span>
                            </div>
                            <div class='flex flex-col'>
                                <span class='text-sm'>{student.species}</span>
                                <span class='text-sm'>{student.type}</span>
                            </div>
                        </div>
                    </li>}
                </For>
            </ul>
        </main>
    );
}
