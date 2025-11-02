export type ThoughtInput = {
  inputText: string,
  tags?: Array<string>,
  thoughtBox?: string
}

export type ThoughtBox = {
  id?: string | number,
  name: string,
  color: string,
  numberOfThoughts? : number
}

export type Thought = {
  id: string | number,
  title?: string,
  tags?: Array<string>,
  thoughtBox?: string,
  text: string,
  createdAt?: string,
  updatedAt?: string,
}

export type SettingListItem = {
  title: string,
  link?: string,
  callback?: () => void
}