/**
 * 主要な歌詞サイトで実行すると､そのページの歌詞をクリップボードにコピーできます｡
 * 対応サイトは以下のif文見たらわかると思います｡
 * ブックマークレットに変換してからの使用をおすすめします｡
 *
 * 【注意】
 * ・何が起こっても責任は取りません｡
 * ・著作権等には注意して使用してください｡
 */

const site = document.domain;

let lyric = '';

if(site === 'www.uta-net.com'){
    lyric = document.getElementById('kashi_area')
    .innerHTML
    .replace(/<br>/g, '\n');
}else if(site === 'j-lyric.net'){
    lyric = document.getElementById('Lyric')
    .innerHTML
    .replace(/<br>$/, '')
    .replace(/<br>/g, '\n');
}else if(site === 'www.utamap.com'){
    lyric = document.querySelector('td.kasi_honbun')
    .innerHTML
    .replace(/\n/, '')
    .replace(/\n\n<!-- 歌詞 end -->\n/, '')
    .replace(/<br>/g, '\n');
}else if(site === 'www.joysound.com'){
    lyric = document.querySelector('#lyrics p[data-ng-bind-html="lyric | nl2br"].ng-binding')
    .innerHTML
    .replace(/<br><br>/g, '\n')
    .replace(/<br>/g, '')
    .trim();
}else if(site === 'utaten.com'){
    lyric = document.querySelector('.lyricBody .hiragana')
    .innerHTML
    .replace(/<span class="rt rt_hidden">.*?<\/span>/g, '')
    .replace(/<span class="rt">.*?<\/span>/g, '')
    .replace(/<span class="ruby">|<span class="rb">|<span class="rt">|<\/span>/g, '')
    .replace(/\n/g, '')
    .replace(/<br>/g, '\n')
    .trim();
}else{
    window.alert('未対応サイト')
    return;
}

navigator.clipboard.writeText(htmlUnEscape(lyric).replace(/　/g, ' '))
.catch(() => {window.alert('コピー失敗');});

function htmlUnEscape(str) {
    if (!str) return;
    return str.replace(/&lt;|&gt;|&amp;|&quot;|&#39;|&#x60;/g, function(match) {
        const escape = {
            '&lt;': '<',
            '&gt;': '>',
            '&amp;': '&',
            '&quot;': '"',
            '&#39;': "'",
            '&#x60;': '`'
        };
        return escape[match];
    });
}