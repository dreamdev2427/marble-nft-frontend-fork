export interface NftInfo {
    readonly address: string;
    readonly tokenId: string;
    readonly image: string;
    readonly name: string;
    readonly user: string;
    readonly price: string;
    readonly total: number;
    readonly collectionName: string;
}
export interface NftCategory {
    readonly id: string;
    readonly slug: string;
    readonly name: string;
}
export interface NftCollection {
    readonly image: string;
    readonly num_tokens: number;
    readonly name: string;
    readonly description: string;
    readonly creator: string;
    readonly banner_image: string;
    readonly slug: string;
    readonly cat_ids: string;
}