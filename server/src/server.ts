import { type DatabaseContext } from "@gsa-tts/forms-database";
import { createServer } from '@gsa-tts/forms-server';

export const createCustomServer = async (db: DatabaseContext): Promise<any> => {
  return createServer({
    title: 'DOJ Form Service',
    db,
    loginGovOptions: {
      loginGovUrl: 'https://idp.int.identitysandbox.gov',
      clientId:
        'urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:tts-10x-atj-dev-server-doj',
      //clientSecret: '', // secrets.loginGovClientSecret,
    },
    isUserAuthorized: async (email: string) => {
      return [
        // 10x team members
        'daniel.naab@gsa.gov',
        'jim.moffet@gsa.gov',
        'ethan.gardner@gsa.gov',
        'natasha.pierre-louis@gsa.gov',
        'emily.lordahl@gsa.gov',
        'khayal.alasgarov@gsa.gov',
        'jenny.richards@gsa.gov',
        // DOJ test users
        'deserene.h.worsley@usdoj.gov',
        'jordan.pendergrass@usdoj.gov',
        'kira.gillespie@usdoj.gov',
        'kameron.c.thomas@usdoj.gov',
      ].includes(email.toLowerCase());
    },
  });
};
