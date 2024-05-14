import { format } from 'date-fns';
import {Platform } from 'react-native';

class ApiService {
  static baseUrl = "https://api-web.nhle.com/v1/playoff-bracket/2024";
  static seriesDetailUrl = "https://api-web.nhle.com/v1/schedule/playoff-series/20232024";
  static gameDetailUrl = "https://api-web.nhle.com/v1/gamecenter";

  async fetchSeries() {
    const response = await fetch(ApiService.baseUrl);
    if (!response.ok) {
      throw new Error('Failed to load series data');
    }

    const data = await response.json();
    if (Platform.OS === 'android') {
      return data.series.map(s => ({
        top: s.topSeedTeam?.abbrev ?? '???',
        bottom: s.bottomSeedTeam?.abbrev ?? '???',
        topId: s.topSeedTeam?.id,
        bottomId: s.bottomSeedTeam?.id,
        score: `${s.topSeedWins ?? 0}-${s.bottomSeedWins ?? 0}`,
        topLogo: s.topSeedTeam?.logo ? (s.topSeedTeam.logo.replace('https://assets.nhle.com/logos/nhl/svg/', '').replace('_dark.svg', '') || '') : 'empty',
        bottomLogo: s.bottomSeedTeam?.logo ? (s.bottomSeedTeam.logo.replace('https://assets.nhle.com/logos/nhl/svg/', '').replace('_dark.svg', '') || 'empty') : 'empty',
        seriesAbbrev: s.seriesAbbrev,
        seriesLetter: s.seriesLetter
      }));
    };
   

    return data.series.map(s => ({
      top: s.topSeedTeam?.abbrev ?? '???',
      bottom: s.bottomSeedTeam?.abbrev ?? '???',
      topId: s.topSeedTeam?.id,
      bottomId: s.bottomSeedTeam?.id,
      score: `${s.topSeedWins ?? 0}-${s.bottomSeedWins ?? 0}`,
      topLogo: s.topSeedTeam?.logo ?? 'empty' ,
      bottomLogo: s.bottomSeedTeam?.logo ?? 'empty',
      seriesAbbrev: s.seriesAbbrev,
      seriesLetter: s.seriesLetter
    }));
  }

  async fetchGamesAndDetails(seriesLetter) {
    const response = await fetch(`${ApiService.seriesDetailUrl}/${seriesLetter}/`);
    if (!response.ok) {
      throw new Error('Failed to load series data');
    }

    const data = await response.json();
    const games = data.games.map(g => ({
      gameId: g.id,
      home: g.homeTeam?.abbrev ?? '???',
      away: g.awayTeam?.abbrev ?? '???',
      homeId: g.homeTeam?.id ?? '???',
      awayId: g.awayTeam?.id,
      score: g.homeTeam?.score != null && g.awayTeam?.score != null ? `${g.homeTeam.score}-${g.awayTeam.score}` : this.formatDate(g.startTimeUTC),
      startTime: g.startTimeUTC
    }));

    const detailsFutures = games.map(game => this.fetchGameDetails(game.gameId));
    const additionalDetails = await Promise.all(detailsFutures);

    for (let i = 0; i < games.length; i++) {
      games[i].details = additionalDetails[i].teamGameStats;
    }

    return games;
  }

  async fetchGameDetails(gameId) {
    const response = await fetch(`${ApiService.gameDetailUrl}/${gameId}/landing`);
    if (!response.ok) {
      throw new Error(`Failed to fetch details for game ${gameId}`);
    }

    const data = await response.json();
    return {
      teamGameStats: data.summary?.teamGameStats ?? {}
    };
  }

  formatDate(dateStr) {
    const dateTime = new Date(dateStr);
    return format(dateTime, 'MM/dd/yyyy');
  }
}

export default new ApiService();