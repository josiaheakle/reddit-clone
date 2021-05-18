type Change <T extends HTMLElement> = (event: React.ChangeEvent<T>) => void;

type ChangeEvent<T extends HTMLElement> = Change<T>;

export type {
    ChangeEvent
}