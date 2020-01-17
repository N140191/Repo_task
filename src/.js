var originalData = repoData.slice(0);   // taking copy
        var finalData = [];
        var regKeyword = new RegExp(keyword, "i");
        // console.log(regKeyword);
        var regLang = new RegExp(lang, "i");
        // console.log(regLang);
        if (keyword == "" && lang == "") {
            return originalData;
        }
        else if (keyword != "" && lang != "") {
            //looping through array both keyword and language
            originalData.forEach(function (item, index) 
            {
                if ((item.name.search(regKeyword) != -1)
                 && (item.language 
                    && item.language.search(regLang) != -1)) {
                    finalData.push(item);
                }
            })
        } 
        else if (keyword != "") {
            //for search keyworld
            originalData.forEach(function (item, index) {
                if (item.name.search(regKeyword) != -1) {
                    finalData.push(item);
                }
            });
        } else if (language != "") {
            //looping through array for language.
            originalData.forEach(function (item, index) {
                if (item.language && item.language.search(regLang) != -1) {
                    finalData.push(item);
                }
            });
        }
        return finalData;