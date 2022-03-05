export interface Technology {
    _id?: string;
    name: string;
    description: string;
    category: string;
    ring?: string;
    classification?: string;
    isPublic: boolean;
    published_at?: Date;
    created_by: number;
    created_at: Date;
    updated_by?: number;
    updated_at?: Date;
  }