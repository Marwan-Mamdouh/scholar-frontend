import { apiGet } from "@/src/lib/api-client";
import type { TeamsData } from "./about.type";

interface TeamsResponse {
  data: {
    stats: { totalTeams: number; totalMembers: number };
    teams: {
      key: string;
      name: string;
      membersCount: number;
      members: {
        id: number;
        name: string;
        role: string;
        linkedinUrl: string | null;
      }[];
    }[];
  };
}

export async function fetchTeams(): Promise<TeamsData | null> {
  try {
    const { data } = await apiGet<TeamsResponse>("/about/teams", {
      cache: "no-store",
    });
    const order = ["web", "academia", "industry"];
    return {
      meta: {
        teamCount: data.stats.totalTeams,
        memberCount: data.stats.totalMembers,
      },
      data: [...data.teams]
        .sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key))
        .map((team) => ({
          title: team.name,
          count: team.membersCount,
          members: team.members.map((member) => ({
            id: String(member.id),
            name: member.name,
            role: member.role,
            linkedIn: member.linkedinUrl ?? undefined,
          })),
        })),
    };
  } catch {
    return null;
  }
}
