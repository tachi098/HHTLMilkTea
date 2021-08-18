package com.fpt.hhtlmilkteaapi.utility;

import java.util.Random;

public class Utils {
    /**
     * A method to generate short key using the first 2 letters, last letter and a random 4 digit number where applicable
     *
     * @param longUrl
     * @return shortKey
     */
    public static String generateShortKey(String longUrl) {
        if (longUrl == null) return "";
        longUrl = getWebsiteName(longUrl);
        if (longUrl.length() <= 2) {
            return longUrl.toLowerCase();
        }

        String shortUrl = "";

        shortUrl += (longUrl.substring(0, 2) + longUrl.substring(longUrl.length() - 1)).toLowerCase();

        Random random = new Random();
        for (int i = 0; i < 4; i++) {
            shortUrl += String.valueOf(random.nextInt(10));
        }
        return shortUrl;
    }

    /**
     * A method to extract the website url excluding the default format 'http://' and 'www'  url inputted
     * http://www.google.com returns the string 'google.com'
     *
     * @param websiteName
     * @return Website url
     */
    private static String getWebsiteName(String websiteName) {
        websiteName = websiteName.toLowerCase();
        if (websiteName.contains("http") || websiteName.contains("www")) {
            websiteName = websiteName.substring(websiteName.indexOf(".") + 1);
        }
        return websiteName;
    }

    /**
     * A method to capitalize the first letter of input string
     *
     * @param entry
     * @return String with only first letter capitalized
     */
    public static String capitalizeFirstLetter(String entry) {
        if (entry == null) return null;
        if (entry.isEmpty() || entry.length() == 1) return entry;
        return entry.substring(0, 1).toUpperCase() + entry.substring(1).toLowerCase();
    }

}
