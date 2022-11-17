import {A} from "solid-start";
import Counter from "~/components/Counter";
import {createEffect, createSignal} from "solid-js";

export default function Home() {
    createEffect(() => {
        window.Telegram.WebApp.MainButton.isVisible = true;
        window.Telegram.WebApp.MainButton.setParams({
            text: 'Join our Telegram group',
        });
    });
    return (
        <main class="text-center mx-auto text-gray-700 p-4">
            <h1 class="text-4xl font-bold">Telegram</h1>
        </main>
    );
}
