import {UserType} from "./user";

export type TeamType = {
    id: number;
    userid: number;
    name: string;
    description: string;
    expiretime?: Date;
    maxnum: number;
    password?: string;
    status: TeamStatus; // 使用枚举类型
    createtime: Date;
    updatetime: Date;
    joinTeamUser?: UserType[];
    hasjoinnum?: number;
};

