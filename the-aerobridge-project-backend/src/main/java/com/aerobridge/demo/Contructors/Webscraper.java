package com.aerobridge.demo.Contructors;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class Webscraper {

    private String url;

    public Webscraper(String url) {
        this.url = url;
    }

    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Double scrapeItem() {
        Document document;

        try {
            document = Jsoup.connect(this.url).get();
        } catch (Exception e) {
            return null;
        }

        Elements elements = document.getElementsByClass("_26qxh");

        for (Element element : elements) {
            String str = element.text();
            String cleanStr = str.replace("Prijs", "").replace("€ ", "").replace(",", ".");
            Double parsedStr = Double.parseDouble(cleanStr);
            return parsedStr;
        }
        return null;

    }

}
