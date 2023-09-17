export default interface ISerializable<T> {
    deserialize(input: Object): T;
}